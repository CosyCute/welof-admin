import { MainLayout } from '$containers';
import {
    CategoryScale,
    Chart as ChartJs,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Title,
} from 'chart.js';
import React from 'react';
import { Chart } from 'react-chartjs-2';

ChartJs.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const StatsPage = () => {
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1],
                // data: Utils.numbers(NUMBER_CFG),
                borderColor: 'red',
                backgroundColor: 'transparent',
            },
            {
                label: 'Dataset 2',
                data: [3, 2, 1],
                borderColor: 'blue',
                backgroundColor: 'transparent',
            },
        ],
    };

    return (
        <MainLayout>
            <Chart type="line" data={data} />
        </MainLayout>
    );
};

export default StatsPage;
