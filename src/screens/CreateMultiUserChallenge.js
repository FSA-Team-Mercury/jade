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
  Picker,
} from "react-native";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import { useIsFocused } from "@react-navigation/native";
import DatePicker from "./DatePicker";

const reviewSchema = yup.object({
  name: yup.string().required(),
  winCondition: yup.string().required(),
  startDate: yup.string().required(),
  friendId: yup.number().required(),
  winAmount: yup.number().required(),
});

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  CREATE_MULTI_PLAYER_CHALLENGE,
  FETCH_ALL_CHALLENGES,
  FETCH_CURENT_CHALLENGES,
  LEAVE_CHALLENGE,
} from "../queries/multiChallenges";

const FETCH_FRIENDS = gql`
  query FetchFriends {
    friends {
      id
      username
      profileImage
    }
  }
`;

/*

gring in friendsId -> to add to challenge

have fields for
  adding users -> get friend Ids (MAP THROUGH CATCH AND GET USERIDS)
  start date -> default to now
  end date -> default to a month
  winning condition -> choose catagories (plaid categories)
  winning amount -> convert to pennies
  name of challenge
  badge image

*/

export default function CreateMultiUserChallenge() {
  // console.log('string date-->', JSON.stringify(startTime))
  const [pendingFriends, setPendingFriends] = useState([]);
  const [createChallenge] = useMutation(CREATE_MULTI_PLAYER_CHALLENGE);
  const { data, loading, error } = useQuery(FETCH_FRIENDS);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [viewDate, setViewDate] = useState("NONE");

  function tobbleDatePicker(dateType) {
    if (dateType === viewDate) {
      setViewDate("NONE");
    } else {
      setViewDate(dateType);
    }
  }
  
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   console.log("startDate-->", startDate);
  //   // console.log('endDate-->', endDate)
  //   return () => {
  //     console.log("unmounting create challenge");
  //   };
  // }, [isFocused]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  function handleSubmit(values) {}
  console.log("data form all challenges FRIENDS--->", data);
  let friends;

  try {
    friends = data.friends;
  } catch (error) {
    friends = [{ id: undefined }];
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.screen}>
        <Formik
          initialValues={{
            startDate: new Date(),
            endDate: new Date(),
            friendId: friends[0].id,
            name: "",
            winCondition: "LESS_THAN",
            winAmount: undefined,
            category: "",
          }}
          // validationSchema={reviewSchema}
          onSubmit={values => {
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
                friendId: values.friendId,
              },
            });
            console.log(values);
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
              <TextInput
                placeholder=" What is the winning amout"
                onChangeText={formikProps.handleChange("winAmount")}
                onBlur={formikProps.handleBlur("winAmount")}
                value={formikProps.values.winAmount}
                style={styles.challengeName}
              />
              <View style={styles.datePickerContainer}>
                <TouchableOpacity
                  style={styles.datePickerBtn}
                  onPress={() => tobbleDatePicker("START_DATE")}
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
                  onPress={() => tobbleDatePicker("END_DATE")}
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

              <View style={styles.friendsContainer}>
                <TouchableOpacity
                  style={styles.friendBtn}
                  onPress={() => tobbleDatePicker("CHOOSE_FRIEND")}
                >
                  <Text style={styles.dateTitle}>Choose A friend</Text>
                </TouchableOpacity>
                <Picker
                  autoCapitalize="none"
                  name="friendId"
                  style={
                    viewDate === "CHOOSE_FRIEND"
                      ? styles.friendsPicker
                      : styles.hideDate
                  }
                  onValueChange={formikProps.handleChange("friendId")}
                  selectedValue={formikProps.values.friendId}
                >
                  {friends.map(friend => {
                    return (
                      <Picker.Item label={friend.username} value={friend.id} />
                    );
                  })}

                  {/* <Picker.Item label="Cody" value="Cody" /> */}
                </Picker>
              </View>

              <View style={styles.friendsContainer}>
                <TouchableOpacity
                  style={styles.friendBtn}
                  onPress={() => tobbleDatePicker("CATEGORY")}
                >
                  <Text style={styles.dateTitle}>
                    What categories are you competing in
                  </Text>
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

              <View style={styles.friendsContainer}>
                <TouchableOpacity
                  style={styles.friendBtn}
                  onPress={() => tobbleDatePicker("WIN_CONDITON")}
                >
                  <Text style={styles.dateTitle}>
                    How Will You win this Challenge
                  </Text>
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
                      label="Having the highest spending"
                      value="GREATER_THAN"
                    />
                    <Picker.Item
                      label="Having the lowest spending"
                      value="LESS_THAN"
                    />
                  </Picker>
                </View>
              </View>

              <Text style={(styles.dateTitle, { marginTop: 100 })}>
                Badge Image Here
              </Text>
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
    marginBottom: 20,
  },
});