import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      isSearchPressed: false,
      isLoading: false,
      word: "Loading...",
      lexicalCategory: "",
      definition: "",
    };
  }
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    return fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchKeyword}`
    )
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          this.setState({
            word: this.state.text,
            definition: responseObject[0].meanings[0].definitions[0].definition,
            lexicalCategory: responseObject[0].meanings[0].partOfSpeech,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: "Not Found",
            lexicalCategory: "Not Found",
          });
        }
      });
  };
  render() {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Header
          backgroundColor={"purple"}
          centerComponent={{
            text: "Pocket Dictionary",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        <View style={styles.inputBoxContainer}>
          <Text
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: "Loading...",
                lexicalCategory: "",
                examples: [],
                definition: "",
              });
            }}
          />
          {
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => {
                this.setState({
                  text: text,
                  isSearchPressed: false,
                  word: "Loading...",
                  lexicalCategory: "",
                  examples: [],
                  definition: "",
                });
              }}
              value={this.state.text}
            />
          }
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}
          >
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20 }}>
            {this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""}
          </Text>
          {this.state.word !== "Loading..." ? (
            <View style={{ justifyContent: "center", marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word : </Text>
                <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type : </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.lexicalCategory}
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={styles.detailsTitle}>Definition : </Text>
                <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBoxContainer: {
    padding: "7%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    padding: 20,
    width: "80%",
    alignSelf: "center",
    height: 40,
    textAlign: "center",
    borderWidth: 4,
    borderColor: "purple",
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "purple",
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: "4%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "purple",
  },
  searchText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  outputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsTitle: {
    color: "orange",
    fontSize: 20,
    fontWeight: "bold",
  },
});
