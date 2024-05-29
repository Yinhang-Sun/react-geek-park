import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const Home = () => {
    const chartRef = useRef(null)
    useEffect(() => {
        // make sure the dom can be used and then 
        // 1. getting the dom node for rendering charts 
        const chartDom = chartRef.current

        // 2. initialization to get an chart instance 
        const myChart = echarts.init(chartDom);

        // 3. prepare charts parameters 
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };
        // 4. complete chart rendering using chart parameters 
        option && myChart.setOption(option);
    }, [])
    return <div><div ref={chartRef} style={{ width: '500px', height: '400px' }}></div></div>
}

export default Home