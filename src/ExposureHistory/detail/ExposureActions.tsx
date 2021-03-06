import React, { FunctionComponent } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { SvgXml } from "react-native-svg"

import { ModalStackScreens } from "../../navigation"
import { Text } from "../../components"
import { useConnectionStatus } from "../../Device/useConnectionStatus"
import { useCustomCopy } from "../../configuration/useCustomCopy"

import {
  Buttons,
  Colors,
  Iconography,
  Outlines,
  Spacing,
  Typography,
} from "../../styles"
import { Icons } from "../../assets"
import { useConfigurationContext } from "../../ConfigurationContext"

const ExposureActions: FunctionComponent = () => {
  const { t } = useTranslation()
  const isInternetReachable = useConnectionStatus()
  const navigation = useNavigation()
  const {
    displayCallbackForm,
    displaySelfAssessment,
    // healthAuthorityAdviceUrl,
    measurementSystem,
  } = useConfigurationContext()
  const { healthAuthorityName } = useCustomCopy()

  // const handleOnPressNextStep = () => {
  //   Linking.openURL(healthAuthorityAdviceUrl)
  // }

  const handleOnPressPersonalizeMyGuidance = () => {
    navigation.navigate(ModalStackScreens.SelfAssessmentFromExposureDetails)
  }

  // const displayNextStepsLink =
  //   !displaySelfAssessment && healthAuthorityAdviceUrl !== ''

  const stayApartRecommendationText =
    measurementSystem === "Imperial"
      ? t("exposure_history.exposure_detail.6ft_apart")
      : t("exposure_history.exposure_detail.2m_apart")

  const recommendations = [
    { icon: Icons.StayApart, text: stayApartRecommendationText },
    {
      icon: Icons.Mask,
      text: t("exposure_history.exposure_detail.wear_a_mask"),
    },
    {
      icon: Icons.WashHands,
      text: t("exposure_history.exposure_detail.wash_your_hands"),
    },
    {
      icon: Icons.DisinfectSurfaces,
      text: t("exposure_history.exposure_detail.disinfect_surfaces"),
    },
    {
      icon: Icons.Ventilation,
      text: t("exposure_history.exposure_detail.ventilation"),
    },
    {
      icon: Icons.IsolateBubbles,
      text: t("exposure_history.exposure_detail.quarantine"),
    },
  ].map((el, index) => (
    <RecommendationBubble key={index} icon={el.icon} text={el.text} />
  ))

  return (
    <>
      <Text style={style.bottomSubheaderText}>
        {t("exposure_history.exposure_detail.ha_guidance_header")}
      </Text>
      <>
        {displayCallbackForm && (
          <RequestCallBackActions healthAuthorityName={healthAuthorityName} />
        )}
        <View>
          <Text style={style.instructionText}>
            {t("exposure_history.exposure_detail.instructions_0")}
          </Text>
          <Text style={style.instructionText}>
            {t("exposure_history.exposure_detail.instructions_1")}
          </Text>
          <Text style={style.instructionText}>
            {t("exposure_history.exposure_detail.instructions_2")}
          </Text>
        </View>
        <Text style={style.bottomSubheaderText}>
          {t("exposure_history.exposure_detail.general_guidance", {
            healthAuthorityName,
          })}
        </Text>
        <View style={style.recommendations}>{recommendations}</View>
        {displaySelfAssessment && (
          <TouchableOpacity
            style={style.buttonOutlined}
            onPress={handleOnPressPersonalizeMyGuidance}
            accessibilityLabel={t(
              "exposure_history.exposure_detail.personalize_my_guidance",
            )}
          >
            <Text style={style.buttonOutlinedText}>
              {t("exposure_history.exposure_detail.personalize_my_guidance")}
            </Text>
            <SvgXml xml={Icons.Arrow} fill={Colors.primary.shade100} />
          </TouchableOpacity>
        )}
        {/*{displayNextStepsLink && (*/}
        {/*  <TouchableOpacity*/}
        {/*    style={style.button}*/}
        {/*    onPress={handleOnPressNextStep}*/}
        {/*    accessibilityLabel={t(*/}
        {/*      'exposure_history.exposure_detail.next_steps',*/}
        {/*    )}*/}
        {/*    disabled={!isInternetReachable}*/}
        {/*  >*/}
        {/*    <Text style={style.buttonText}>*/}
        {/*      {t('exposure_history.exposure_detail.next_steps')}*/}
        {/*    </Text>*/}
        {/*    <SvgXml xml={Icons.Arrow} fill={Colors.background.primaryLight}/>*/}
        {/*  </TouchableOpacity>*/}
        {/*)}*/}
        {!isInternetReachable && (
          <Text style={style.connectivityWarningText}>
            {t("exposure_history.no_connectivity_message")}
          </Text>
        )}
      </>
    </>
  )
}

type RequestCallBackActionsProps = {
  healthAuthorityName: string
}

const RequestCallBackActions: FunctionComponent<RequestCallBackActionsProps> = ({
  healthAuthorityName,
}) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const handleOnPressRequestCallback = () => {
    navigation.navigate(ModalStackScreens.CallbackStack)
  }

  return (
    <>
      <Text style={style.bottomSubheaderText}>
        {t("exposure_history.exposure_detail.schedule_callback", {
          healthAuthorityName,
        })}
      </Text>
      <TouchableOpacity
        style={style.button}
        onPress={handleOnPressRequestCallback}
        accessibilityLabel={t(
          "exposure_history.exposure_detail.speak_with_contact_tracer",
        )}
      >
        <Text style={style.buttonText}>
          {t("exposure_history.exposure_detail.speak_with_contact_tracer")}
        </Text>
        <SvgXml xml={Icons.Arrow} fill={Colors.background.primaryLight} />
      </TouchableOpacity>
    </>
  )
}

type RecommendationBubbleProps = {
  text: string
  icon: string
}
const RecommendationBubble: FunctionComponent<RecommendationBubbleProps> = ({
  text,
  icon,
}) => {
  return (
    <View style={style.recommendation}>
      <View style={style.recommendationBubbleCircle}>
        <SvgXml
          xml={icon}
          fill={Colors.primary.shade125}
          width={Iconography.small}
          height={Iconography.small}
        />
      </View>
      <Text style={style.recommendationText}>{text}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  bottomHeaderText: {
    ...Typography.header.x30,
    marginBottom: Spacing.xxSmall,
  },
  bottomSubheaderText: {
    ...Typography.body.x30,
    color: Colors.neutral.shade100,
    marginBottom: Spacing.medium,
  },
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: Spacing.xxxLarge,
  },
  recommendation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    marginBottom: Spacing.xxSmall,
  },
  recommendationBubbleCircle: {
    ...Iconography.smallIcon,
    borderRadius: Outlines.borderRadiusMax,
    backgroundColor: Colors.secondary.shade10,
    padding: Spacing.xLarge,
    marginTop: Spacing.xxSmall,
    marginBottom: Spacing.xxSmall,
  },
  recommendationText: {
    ...Typography.body.x10,
    textAlign: "center",
  },
  instructionText: {
    ...Typography.body.x10,
    marginBottom: Spacing.xSmall,
  },
  connectivityWarningText: {
    ...Typography.utility.error,
    marginTop: Spacing.small,
  },
  button: {
    ...Buttons.thin.base,
    marginBottom: Spacing.small,
  },
  buttonText: {
    ...Typography.button.primary,
    marginRight: Spacing.small,
  },
  buttonOutlined: {
    ...Buttons.outlined.thin,
    marginBottom: Spacing.small,
  },
  buttonOutlinedText: {
    ...Typography.button.secondary,
    marginRight: Spacing.small,
  },
})

export default ExposureActions
