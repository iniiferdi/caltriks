import { clone } from "lodash";
import { matrix, det, transpose } from "mathjs";
import Fraction from "fraction.js";

function toFractionMatrix(mat) {
    return mat.map(row => row.map(value => new Fraction(value)));
}

function minor(mat, i, j) {
    return mat
        .filter((_, rowIndex) => rowIndex !== i)
        .map(row => row.filter((_, colIndex) => colIndex !== j));
}

function cofactorMatrix(mat) {
    const size = mat.length;
    const cof = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const sign = ((i + j) % 2 === 0) ? 1 : -1;
            const minorMat = minor(mat, i, j);
            const minorDet = new Fraction(det(matrix(minorMat)));
            row.push(minorDet.mul(sign));
        }
        cof.push(row);
    }

    return cof;
}

export function adjugateInverseSteps(mat) {
    const steps = [];
    const A = toFractionMatrix(clone(mat));
    const A_numeric = clone(mat);

    const detA = new Fraction(det(matrix(A_numeric)));

    if (detA.equals(0)) {
        steps.push({
            description: "Determinan bernilai 0, matriks tidak memiliki invers.",
            result: null
        });
        return steps;
    }

    steps.push({
        description: `Menentukan determinan matriks: det(A) = ${detA.toFraction(true)}`,
        result: null
    });

    const cof = cofactorMatrix(A);
    steps.push({
        description: "Matriks kofaktor:",
        result: cof
    });

    const adj = transpose(cof);
    steps.push({
        description: "Adjoint (transpose dari kofaktor):",
        result: adj
    });

    const inverse = adj.map(row => row.map(cell => cell.div(detA)));
    steps.push({
        description: `Membagi adjoint dengan determinan: A⁻¹ = 1/det(A) × adj(A)`,
        result: inverse
    });

    return steps;
}

