import styled from "@emotion/native";
import { StyleSheet, type FlatList } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

export const StyledFlatList = styled.FlatList({}) as unknown as typeof FlatList

export const useStyles = (insets: EdgeInsets) => StyleSheet.create({
    flatlistContainer: {
        paddingBottom: insets.bottom || scale(10)
    },
})