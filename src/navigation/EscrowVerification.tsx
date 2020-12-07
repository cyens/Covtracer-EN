import React, { FunctionComponent } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { EscrowVerificationProvider } from "../EscrowVerification/EscrowVerificationContext"
import Start from "../EscrowVerification/Start"

import { EscrowVerificationRoutes } from "."
import { applyHeaderLeftBackButton } from "./HeaderLeftBackButton"

import { Headers } from "../styles"

export type EscrowVerificationRouteParamList = {
  EscrowVerificationStart: undefined
}

const Stack = createStackNavigator<EscrowVerificationRouteParamList>()

const AffectedUserStack: FunctionComponent = () => {
  return (
    <EscrowVerificationProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen
          name={EscrowVerificationRoutes.EscrowVerificationStart}
          component={Start}
          options={{
            ...Headers.headerMinimalOptions,
            headerLeft: applyHeaderLeftBackButton(),
          }}
        />
      </Stack.Navigator>
    </EscrowVerificationProvider>
  )
}

export default AffectedUserStack
