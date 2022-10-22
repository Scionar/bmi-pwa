import React from 'react';
import styles from './ClassList.module.css'

type ClassListProps = {
    style?: React.CSSProperties;
}

type RowProps = {
    name: string;
    range: string;
    rowStyle?: string;
}

const ClassList = ({ style }: ClassListProps) => {

    const Row = ({ name, range, rowStyle }: RowProps) => {
        return (
            <div className={[styles.row, rowStyle].join(' ')}>
                <span className={styles.rowText}>{name}</span>
                <span className={styles.rowText}>{range}</span>
            </div>
        );
    };
    
    return (
        <div className={styles.container} style={style}>
            <Row name="Underweight" range="< 18.5" rowStyle={styles.topRow} />
            <Row name="Normal range" range="18.5 - 24.9" />
            <Row name="Preobese" range="25.0 - 29.9" />
            <Row name="Obese class I" range="30.0 - 34.9" />
            <Row name="Obese class II" range="35.0 - 39.9" />
            <Row name="Obese class III" range="≥ 40" rowStyle={styles.bottomRow} />
        </div>
    );
};

export default ClassList;
