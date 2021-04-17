import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native-paper";

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "QTDDA2QX_tQfaA",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        preferLocalhost: true,
        native: "beepyboopy://"
      }),
    },
    {
      authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
      tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    }
  );

  // this is copied from the docs
  useEffect(() => {
    response?.type && console.log(response.type);
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(code);
    }
  }, [response]);

  // see the case is correct here.
  // but the actual link opened
  // does not case the client id
  // correctly
  console.log(request?.url);

  return (
    <View style={styles.container}>
      <Text>Click below or else</Text>
      <Button
        disabled={!request}
        mode="contained"
        onPress={() => {
          promptAsync();
        }}
      >
        Reddit Oauth Trigger
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
