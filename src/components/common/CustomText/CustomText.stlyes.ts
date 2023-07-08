import styled from "@emotion/native";
import { scale } from "react-native-size-matters";
import { isForInStatement } from "typescript";

export const BodyText = styled.Text(({theme}) => {
    return {
        fontSize: scale(14),
        color: theme.colors.typography.body
    }
}) 

export const TitleText = styled.Text(({theme}) => {
    return {
        fontSize: scale(15),
        fontWeight: "700",
        color: theme.colors.typography.common
    }
})

export const CaptionText = styled.Text(({theme}) => {
 return {
    fontSize: scale(13),
    color: theme.colors.typography.body
 }
})