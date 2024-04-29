import React, { useState } from 'react';
import { Page, Font, Text, Document, StyleSheet } from '@react-pdf/renderer';
import Roboto from "../fonts/Roboto-Regular.ttf";

Font.register({
    family: 'Roboto',
    src: Roboto,
    format: "truetype"
});

const styles = StyleSheet.create({
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
        fontFamily: "Roboto"
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Roboto"
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily: "Roboto"
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Roboto"
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey"
    },
    felek: {
        marginLeft: 10,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Roboto"
    }
});

const date = new Date().toJSON().slice(0, 10);

function createNamingConventions(props) {
    if (props.name === undefined) {
        return;
    } else {
        var table = [];
        for (let i = 0; i < props.subjectNames.length; i++) {
            table.push(
                <Text style={styles.text}>{props.subjectNames[i]} aláírása: _____________________ Dátum: {date} </Text>
            );
        }
        return table;
    }
}
function createHeader(props) {
    if (props.name !== undefined) {
        var table = [];
        for (let i = 0; i < props.subjectNames.length; i++) {
            table.push(
                <Text style={styles.text}>{props.subjectNames[i]}:</Text>
            );
            for (let j = 0; j < props.data.length; j++) {
                if (props.data[j].namingConvention === props.subjectNames[i]) {
                    if (Object.keys(props.data[j]).length === 3) {
                        table.push(
                            <Text style={styles.felek}>{props.data[j].name}</Text>
                        );
                    }
                    table.push(
                        <Text style={styles.felek}>{props.data[j].info} </Text>
                    );
                }
            }
        }
        return table;
    }
}


const PDFfile = (props) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.header}>Contract Genie</Text>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.text}>1. Felek:</Text>
            {createHeader(props)}
            <Text style={styles.text}>{props.content}</Text>
            <Text style={styles.text}>A felek aláírása előtt az alábbiak szerint került aláírásra és elfogadásra a jelen szerződés. </Text>
            {createNamingConventions(props)}
            <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                } />
        </Page>
    </Document>
);
export default PDFfile;

/*
{props.namingConventions.map((name) => (
                    <Text style={styles.text}>{name} aláírása: ____________________ Dátum: {date} </Text>
                ))}

                <Text style={styles.text}>{props.subjectNames} aláírása: ____________________ Dátum: {date} </Text>
            <Text style={styles.text}>{props.subjectNames} aláírása: _____________________ Dátum: {date} </Text>
*/

