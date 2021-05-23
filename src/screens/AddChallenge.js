import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "./DatePicker";
import { images } from "../styles/global";

const reviewSchema = yup.object({
  name: yup.string().required(),
  winCondition: yup.string().required(),
  startDate: yup.string().required(),
  winAmount: yup.number().required(),
  category: yup.string().required()
});

import { gql, useMutation,useQuery } from "@apollo/client";
import {
  CREATE_MULTI_PLAYER_CHALLENGE,
  FETCH_ALL_CHALLENGES,
  FETCH_CURENT_CHALLENGES,
  LEAVE_CHALLENGE,
} from "../queries/multiChallenges";
import {
  GET_USER_DATA
} from '../queries/user'
import { client } from "../../App";

const FETCH_FRIENDS = gql`
  query FetchFriends {
    friends {
      id
      username
      profileImage
    }
  }
`;

const badgeArray = [
  "rainbow",
  "thunder",
  "earth",
  "cascade",
  "soul",
  "marsh",
  "volcano",
  "boulder",
];
let thisBadge = badgeArray[Math.floor(Math.random() * 8)];
let thisBadgeImage = images.badges[thisBadge];

export default function AddChallenge({navigation, route}) {
  const [createChallenge] = useMutation(CREATE_MULTI_PLAYER_CHALLENGE);
  const [friendId, setFriendId] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [viewDate, setViewDate] = useState("NONE");
  const [oldChallenges, setOldChallenges] = useState([])
  const [friends, setFriends] = useState([])

  const { data, loading, error } = useQuery(FETCH_FRIENDS);
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  useEffect(()=>{
    setFriends(data.friends || [])
  })

  function tobbleDataPicker(dateType) {
    if (dateType === viewDate) {
      setViewDate("NONE");
    } else {
      setViewDate(dateType);
    }
  }

  let friendsObj = {0:'Solo'}

  const myFriends = friends.map(friend => {
    friendsObj[friend.id] = friend.username
    return (
      <Picker.Item label={friend.username} value={friend.id} key={friend.id} />
    );
  });

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.screen}>
        <Formik
          initialValues={{
            startDate: new Date(),
            endDate: new Date(),
            name: "",
            winCondition: "LESS_THAN",
            winAmount: "",
            category: "Travel",
            badgeImage: "rainbow",
          }}
          validationSchema={reviewSchema}
          onSubmit={async (values,{ setSubmitting, setFieldError }) => {
            try {
              console.log('endData--->',endDate)
              console.log('endData status--->',new Date() > endDate)
              if (new Date() > endDate){
                setFieldError("endDate", 'Date must be valid');
                setSubmitting(false);
                throw new Error('Date must be valid')
              }
              values.startDate = startDate.toString();
              values.endDate = endDate.toString();
              createChallenge({
                variables: {
                  name: values.name,
                  startDate: values.startDate,
                  winCondition: values.winCondition,
                  endDate: values.endDate,
                  completed: false,
                  winAmount: Number(values.winAmount) * 100,
                  category: values.category,
                  friendId: friendId,
                  badgeImage: thisBadge,
                },
              update: (cache, { data:{createMultiplayerChallenge} }) =>{
              const newChallenge = createMultiplayerChallenge.multiPlayerChallenges
              const conbined = newChallenge.concat(route.params.challenges)
              const res = cache.readQuery({ query: GET_USER_DATA });
              route.params.setChallenges(conbined)
              cache.writeQuery({
                query:GET_USER_DATA,
                data:{
                  allMultiPlayerChallenges:{
                    ...res.allMultiPlayerChallenges,
                    multiPlayerChallenges: conbined
                  }
                }
              })

              },
              });
              navigation.goBack();
            } catch (error) {
              console.log("error submiting challenge", error);
              // setFieldError("loginError", err.message);
              setSubmitting(false);
              console.log(error);
            }
          }}
        >
          {formikProps => (
            <>
              <TextInput
                placeholder=" Name of Challenge"
                onChangeText={formikProps.handleChange("name")}
                onBlur={formikProps.handleBlur("name")}
                value={formikProps.values.name}
                style={styles.challengeName}
              />
              <Text style={styles.warning}>{formikProps.errors.name}</Text>
              <TextInput
                placeholder=" What is the winning amout"
                onChangeText={formikProps.handleChange("winAmount")}
                onBlur={formikProps.handleBlur("winAmount")}
                value={formikProps.values.winAmount}
                style={styles.challengeName}
              />

              {/* ERROR WIN AMOUT */}
              <Text style={styles.warning}>{formikProps.errors.winAmount}</Text>

              <View style={styles.datePickerContainer}>
                <TouchableOpacity
                  style={styles.datePickerBtn}
                  onPress={() => tobbleDataPicker("START_DATE")}
                >
                  <Text style={styles.dateTitle}>Pick Start Date</Text>
                  <Text style={styles.dateTitle}>
                    {moment(startDate).format("MM DD YYYY")}
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    viewDate === "START_DATE"
                      ? styles.viewDate
                      : styles.hideDate
                  }
                >
                  <DatePicker date={startDate} setDate={setStartDate} />
                </View>
              </View>

              <View style={styles.datePickerContainer}>
                <TouchableOpacity
                  style={styles.datePickerBtn}
                  onPress={() => tobbleDataPicker("END_DATE")}
                >
                  <Text style={styles.dateTitle}>Pick End Date</Text>
                  <Text style={styles.dateTitle}>
                    {moment(endDate).format("MM/DD/YYYY")}
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    viewDate === "END_DATE" ? styles.viewDate : styles.hideDate
                  }
                >
                  <DatePicker date={startDate} setDate={setEndDate} />
                </View>
              </View>
              <Text style={styles.hint}>
              {formikProps.errors.endDate}
              </Text>

              <View style={styles.friendsContainer}>
                <TouchableOpacity
                  style={styles.chooseFriend}
                  onPress={() => tobbleDataPicker("CHOOSE_FRIEND")}
                >
                  <Text style={styles.dateTitle}>Choose A friend:</Text>
                  <Text style={styles.friendName}>{friendsObj[friendId]}</Text>
                </TouchableOpacity>
                <Picker
                  autoCapitalize="none"
                  name="friendId"
                  style={
                    viewDate === "CHOOSE_FRIEND"
                      ? styles.friendsPicker
                      : styles.hideDate
                  }
                  onValueChange={setFriendId}
                  selectedValue={friendId}
                >
                  <Picker.Item label={"Solo Challenge"} value={0} />
                  {myFriends}
                </Picker>
              </View>

              <View style={styles.friendsContainer}>
                <TouchableOpacity
                  style={styles.friendBtn}
                  onPress={() => tobbleDataPicker("CATEGORY")}
                >
                  <Text style={styles.dateTitle}>
                    What categories are you competing in
                  </Text>
                  <Text style={styles.fieldHint}>{formikProps.values.category}</Text>
                </TouchableOpacity>
                <View
                  style={
                    viewDate === "CATEGORY"
                      ? styles.friendsPicker
                      : styles.hideDate
                  }
                >
                  <Picker
                    autoCapitalize="none"
                    name="category"
                    onValueChange={formikProps.handleChange("category")}
                    selectedValue={formikProps.values.category}
                  >
                    <Picker.Item label="Travel" value="Travel" />
                    <Picker.Item label="Payment" value="Payment" />
                    <Picker.Item label="Transfer" value="Transfer" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
              </View>
              {/* ERRORS CATEGORY */}
              <Text style={styles.warning}>{formikProps.errors.category}</Text>

              <View style={styles.friendsContainer}>
                <TouchableOpacity
                  style={styles.friendBtn}
                  onPress={() => tobbleDataPicker("WIN_CONDITON")}
                >
                  <Text style={styles.dateTitle}>
                    How Will You win this Challenge
                  </Text>
                  <Text style={styles.fieldHint}>{formikProps.values.winCondition === "LESS_THAN" ? "Lowest spender in category" : "Most spenders in category"}</Text>
                </TouchableOpacity>
                <View
                  style={
                    viewDate === "WIN_CONDITON"
                      ? styles.friendsPicker
                      : styles.hideDate
                  }
                >
                  <Picker
                    autoCapitalize="none"
                    name="winCondition"
                    onValueChange={formikProps.handleChange("winCondition")}
                    selectedValue={formikProps.values.winCondition}
                  >
                    <Picker.Item
                      label="Highest spender in category"
                      value="GREATER_THAN"
                    />
                    <Picker.Item
                      label="Lowest spender in category"
                      value="LESS_THAN"
                    />
                  </Picker>
                </View>
              </View>

              {/* ERRORS winCondition */}
              <Text style={styles.warning}>{formikProps.errors.winCondition}</Text>

              <View style={(styles.badgeImageContainer, { marginTop: 30 })}>
                <Image style={styles.badgeImage} source={thisBadgeImage} />
                <Text style={styles.dateTitle}>Earn this badge!</Text>
              </View>
              <TouchableOpacity
                style={styles.addChallenge}
                onPress={formikProps.handleSubmit}
              >

                <Text>Add Challenge</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const center = {
  marginLeft: "auto",
  marginRight: "auto",
};

const shadow = (height, width) => {
  return {
    shadowOffset: {
      width: width || 2,
      height: height || 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  };
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  badgeImageContainer: {
    flex: 1,
    flexDirection: "column",
  },
  badgeImage: {
    height: 150,
    width: 150,
    marginBottom: 30,
  },
  challengeName: {
    marginTop: 20,
    height: 50,
    width: "90%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
  },
  hideDate: {
    display: "none",
  },
  datePickerContainer: {
    width: "90%",
    // ...center,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerBtn: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    backgroundColor: "white",
    // borderRadius: 10
    ...shadow(),
  },
  viewDate: {
    display: "flex",
    backgroundColor: "white",
    ...shadow(5, 0),
    width: "100%",
  },
  friendName:{
     fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
    color: 'green'
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  winCondition: {
    width: "100%",
    // flexDirection: 'row',
    height: 80,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  friendsPicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 18,
    // borderRadius: 6,
    // marginTop: 20,
    width: "90%",
    backgroundColor: "white",
  },
  friendsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    ...shadow(2, 0),
  },
  chooseFriend:{
    width: "90%",
    height: 80,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: 'row'
    //  borderRadius: 10
  },
  friendBtn: {
    width: "90%",
    height: 80,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //  borderRadius: 10
  },
  addChallenge: {
    height: 50,
    width: 150,
    marginTop: 50,
    borderRadius: 5,
    backgroundColor: "#00A86B",
    ...shadow(),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  warning:{
    color: 'crimson',
    marginTop: 5,
    fontSize: 16
  },
  fieldHint:{
    color: 'green',
    fontSize: 16,
    marginTop: 5
  }
});
