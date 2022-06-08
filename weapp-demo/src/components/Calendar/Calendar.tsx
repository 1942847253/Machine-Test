/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarItem, generateCalendar } from "../../utils/generateCalendar";

import "./index.less";

interface ICalendar {
  checkedDate?: (dateArr: string[]) => void;
}
let dayOfWeekk = ["日", "一", "二", "三", "四", "五", "六"];

const Calendar: React.FC<ICalendar> = ({ checkedDate }) => {
  const [calendarTable, setCalendarTable] = useState(
    generateCalendar(new Date())
  );
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const getOddDay = (dayItem: CalendarItem): boolean => {
    const checkedDay = `${dayItem.year}-${dayItem.month}-${dayItem.day}`;
    const currentDayAsWeek = dayjs(checkedDay).day();
    const oddWeek = [1, 3, 5];
    if (oddWeek.includes(currentDayAsWeek) && dayItem.isCurrentMonth) {
      return true;
    } else {
      return false;
    }
  };

  const checkedCalendarDate = (dayItem: CalendarItem) => {
    const dataStr = `${dayItem.year}年-${dayItem.month}月-${dayItem.day}日`;
    let list = checkedList;
    if (list.includes(dataStr)) {
      list.splice(list.indexOf(dataStr), 1);
    } else if (dayItem.isCurrentMonth) {
      list.push(dataStr);
    }
    setCheckedList(list.concat());
    checkedDate!(checkedList);
  };

  const isChecked = (dayItem: CalendarItem): string => {
    const dataStr = `${dayItem.year}年-${dayItem.month}月-${dayItem.day}日`;
    return dataStr;
  };

  const currentData = (): string => {
    return `${dayjs().year()} 年 ${dayjs().month() + 1} 月`;
  };

  return (
    <View className="content">
      <View className="title">{currentData()}</View>
      <View className="table">
        <View className="thead">
          <View className="tr">
            {dayOfWeekk.map((dayName, i) => (
              <View className="th" key={i}>
                {dayName}
              </View>
            ))}
          </View>
        </View>
        <view className="tbody">
          {calendarTable.map((week, index) => (
            <view className="tr" key={index}>
              {week.map((day, i) => (
                <view
                  className="td"
                  key={i}
                  onClick={() => checkedCalendarDate(day)}
                >
                  <View
                    className={`${day.isCurrentMonth ? "span" : "grey"} ${
                      checkedList.includes(isChecked(day)) && day.isCurrentMonth
                        ? "checkedStyle"
                        : ""
                    }`}
                  >
                    {day.day}
                  </View>
                  {getOddDay(day) && <View className="isOdd"></View>}
                </view>
              ))}
            </view>
          ))}
        </view>
      </View>
    </View>
  );
};

export default Calendar;
