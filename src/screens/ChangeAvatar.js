import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import { gql, useMutation } from "@apollo/client";
import FlatButton from "../shared/button";
import { client } from "../../App";
import { useIsFocused } from "@react-navigation/native";
import { images } from "../styles/global";
import { UPDATE_PROFILE_PIC } from "../queries/user";

export default function ChangeAvatar(props) {
  const { profileImage, username } = props.route.params;
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(profileImage);
  const [updateProfilePic] = useMutation(UPDATE_PROFILE_PIC);

  useEffect(() => {}, [isFocused, img]);

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Image
          source={images.avatar[profileImage]}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <Text style={styles.userName}>{username}</Text>

      {/* Change avatar */}
      <Formik
        initialValues={{ profileImage: img }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data: userData } = await updateProfilePic({
              variables: {
                id: id,
                profileImage: img,
              },
            });

            const { profileImage, id } = userData.updateProfilePic;

            await client.writeFragment({
              id: `User:${id}`,
              fragment: gql`
                fragment UserPicUpdate on User {
                  _typename
                  profileImage
                }
              `,
              data: {
                _typename: "User",
                profileImage: profileImage,
              },
            });

            setImg(profileImage);
            props.navigation.goBack();
          } catch (err) {
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <View>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={img}
              setValue={setImg}
              items={[
                {
                  label: "Riri",
                  value: "rihanna",
                  icon: () => (
                    <Image
                      source={images.avatar["rihanna"]}
                      style={styles.icon}
                    />
                  ),
                },
                {
                  label: "Mezut",
                  value: "ozil",
                  icon: () => (
                    <Image source={images.avatar["ozil"]} style={styles.icon} />
                  ),
                },
                {
                  label: "Moe",
                  value: "salah",
                  icon: () => (
                    <Image
                      source={images.avatar["salah"]}
                      style={styles.icon}
                    />
                  ),
                },
                {
                  label: "Benito",
                  value: "bad-bunny",
                  icon: () => (
                    <Image
                      source={images.avatar["bad-bunny"]}
                      style={styles.icon}
                    />
                  ),
                },
                {
                  label: "Robo",
                  value: "robo",
                  icon: () => (
                    <Image source={images.avatar["robo"]} style={styles.icon} />
                  ),
                },
                {
                  label: "Bey",
                  value: "beyonce",
                  icon: () => (
                    <Image
                      source={images.avatar["beyonce"]}
                      style={styles.icon}
                    />
                  ),
                },
                {
                  label: "Sophie",
                  value: "sophia-loren",
                  icon: () => (
                    <Image
                      source={images.avatar["sophia-loren"]}
                      style={styles.icon}
                    />
                  ),
                },
              ]}
              label="Choose your avatar!"
              placeholder="Choose an avatar..."
              style={styles.picker}
              defaultValue={profileImage} //should be the same as before
              containerStyle={styles.pickerContainer}
              itemStyle={styles.item}
              dropDownStyle={styles.item}
              textStyle={{
                fontSize: 15,
                color: "grey",
              }}
            />
            <FlatButton
              style={styles.changeButton}
              text="Change Avatar"
              onPress={formikProps.handleSubmit}
            />
            <Button title="cancel" onPress={() => props.navigation.goBack()} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 100,
    alignItems: "center",
  },
  profilePicContainer: {
    height: 160,
    width: 150,
    borderRadius: 100,
    backgroundColor: "lightgrey",
    marginLeft: 10,
    marginRight: 10,
  },
  userName: {
    fontSize: 27,
    marginTop: 5,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  picker: {
    backgroundColor: "transparent",
    borderColor: "lightgrey",
    marginBottom: 50,
  },
  pickerContainer: {
    backgroundColor: "transparent",
    textAlign: "center",
  },
  item: {
    backgroundColor: "transparent",
  },
});
