import React, { useState } from 'react';
import { Page, Font, Text, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey"
    },
    title: {
        fontSize: 24,
        textAlign: "center"
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify"
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey"
    }
});

const date = new Date().toJSON().slice(0, 10);


const PDFfile = (props) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.header}>Contract Genie</Text>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.text}>1. Felek:</Text>
            <Text style={styles.text}>{props.content}</Text>
            <Text style={styles.text}>A felek aláírása előtt az alábbiak szerint került aláírásra és elfogadásra a jelen szerződés. </Text>
            <Text style={styles.text}>{props.subjectNames} aláírása: ____________________ Dátum: {date} </Text>
            <Text style={styles.text}>{props.subjectNames} aláírása: _____________________ Dátum: {date} </Text>
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
*/

           