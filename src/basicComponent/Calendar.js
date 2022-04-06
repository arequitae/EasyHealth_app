import React, { Component } from 'react'
import {Calendar} from 'react-native-calendars';
import { formatNowDate } from '../utils/DateUtils';

/**
 * {props}
 * backgroundColor:背景色
 * fontWeight
 * color:文本颜色
 * days: 打卡日期数组
 */
class CheckCalendar extends Component {
    constructor(props) {
        super(props);   
       this.now=formatNowDate('yyyy-MM-dd');
    }
    customStyles= {
        container: {
            backgroundColor: this.props.color?this.props.color:'green'
        },
        text: {
            color: this.props.textColor?this.props.textColor:'white',
            fontWeight: this.props.fontWeight?this.props.fontWeight:'bold',
        }
    }
    
    render() { 
        let markedDates={}
        for(let day of this.props.days){
            if(day!==this.now){
                markedDates[day]={
                    customStyles:this.customStyles
                } 
            }
            else{
                //这里要深拷贝customStyles 
                markedDates[day]={
                    customStyles:{...this.customStyles}
                } 
                markedDates[day].customStyles.container={...markedDates[day].customStyles.container,borderWidth:2,
                    borderColor:'rgb(37, 174, 243)'};
            }

            
        }
        return ( 
            <Calendar
            markingType={'custom'}
            markedDates={markedDates}
            />
         );
    }
}
 
export default CheckCalendar;