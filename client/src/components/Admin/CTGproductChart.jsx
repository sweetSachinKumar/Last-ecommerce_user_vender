import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut} from "react-chartjs-2"



// defaults.maintainAspectRatio = false
defaults.responsive = true
defaults.plugins.title.display = true
defaults.plugins.title.align = "start"
// defaults.plugins.title.font.size = 20
defaults.plugins.title.color = "black"

const CTGproductChart = ({allProduct}) => {
  return (
    <div className='flex justify-center lg:justify-between flex-wrap gap-10 items-center lg:w-[60vw]'>
        <div className=' '>
      <Bar 
        data={{
            labels: allProduct.map(product => product.label),
            datasets: [
                {
                    label: "all category Product",
                    data: allProduct.map(product => product.dataLength),
                    backgroundColor: [
                        "rgba(43, 73, 220,.9)",
                        "rgba(225, 176, 12,.9)",
                        "rgba(264, 135, 135,.9)",
                        "rgba(164, 235, 235,.9)",
                      ],
                      borderColor: [
                        "rgba(43, 73, 220,.9)",
                        "rgba(225, 176, 12,.9)",
                        "rgba(264, 135, 135,.9)",
                        "rgba(164, 135, 135,.9)",
                      ],
                }
            ]
        }}
    options={{
        maintainAspectRatio: true,
        legend: {
            labels: {
                fontSize: 20
            }
        }
    }}
      />
      </div>
      <div  className=' '>
        <Doughnut 
        data={{
            labels: ["users", "orders"],
            datasets: [
                {
                    label: "total Orders",
                    data: [5,2]
                }
            ]
        }}
        options={{
            maintainAspectRatio: true,
            legend: {
                labels: {
                    fontSize: 20
                }
            }
        }}

/>
      </div>
    </div>
  )
}

export default CTGproductChart
