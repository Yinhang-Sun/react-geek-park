// Bar Chart components 
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
// 1. Put all functional codes in this component
// 2. Abstract the variable part into prop parameters

const BarChart = ({title}) => {
    const chartRef = useRef(null)
    useEffect(() => {
        // Make sure the dom can be used and then 
        // 1. Getting the dom node for rendering charts 
        const chartDom = chartRef.current

        // 2. Initialization to get an chart instance 
        const myChart = echarts.init(chartDom);

        // 3. prepare charts parameters 
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 30, 25],
                    type: 'bar'
                }
            ]
        };
        // 4. complete chart rendering using chart parameters 
        option && myChart.setOption(option);
    }, [])
    return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
}

export default BarChart