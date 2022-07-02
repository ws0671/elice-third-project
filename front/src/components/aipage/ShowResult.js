import { Grid } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import styled from "styled-components";

const ResultContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // max-width: 500px;
    // max-height: 200px;
    margin: 30px auto;
    font-size: 25px;
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ShowResult = ({ labels, probabilities }) => {
    console.log(labels);
    const data = {
        labels,
        datasets: [
            {
                data: probabilities,
                borderColor: "rgb(125, 173, 184)",
                backgroundColor: "rgba(101, 148, 158, 0.6)",
            },
        ],
    };

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 0,
            },
        },
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            xAxes: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };
    return (
        <ResultContainer>
            분석 결과
            <Bar data={data} options={options} width={400} height={200} />
        </ResultContainer>
    );
};

export default ShowResult;
