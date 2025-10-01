import { useEffect, useState } from "react";
import  ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import  ChevronRightIcon  from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import { CALENDAR_EVENT_STYLE } from "./util";
import { Button } from "@heroui/react";

type ThemeType = "BLUE" | "GREEN" | "PURPLE" | "ORANGE" | "PINK" | "MORE";

const THEME_BG: Record<ThemeType, string> = CALENDAR_EVENT_STYLE;

type CalendarEvent = {
    startTime: string | Date;
    title: string;
    theme: ThemeType;
};

function CalendarView({calendarEvents, addNewEvent, openDayDetail}: { 
    calendarEvents: CalendarEvent[], 
    addNewEvent: (date?: Date) => void, 
    openDayDetail: (detail: { filteredEvents: { title: string, theme: string }[], title: string }) => void 
}) {

    const today = moment().startOf('day')
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses = [
      "",
      "col-start-2",
      "col-start-3",
      "col-start-4",
      "col-start-5",
      "col-start-6",
      "col-start-7",
  ];

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month'))
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

    useEffect(() => {
        setEvents(calendarEvents)
    }, [calendarEvents])
    

    const allDaysInMonth = ()=> {
        let start = moment(firstDayOfMonth).startOf('week')
        let end = moment(moment(firstDayOfMonth).endOf('month')).endOf('week')
        var days = [];
        var day = start;
        while (day <= end) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days
    }

    const getEventsForCurrentDate = (date: any) => {
        let filteredEvents = events.filter((e) => {return moment(date).isSame(moment(e.startTime), 'day') } )
        if(filteredEvents.length > 2){
            let originalLength = filteredEvents.length
            filteredEvents = filteredEvents.slice(0, 2)
            filteredEvents.push({title : `${originalLength - 2} more`, theme : "MORE", startTime: date})
        }
        return filteredEvents
    }

    const openAllEventsDetail = (date: any, theme: any) => {
        if(theme != "MORE")return 1
        let filteredEvents = events.filter((e) => {return moment(date).isSame(moment(e.startTime), 'day') } ).map((e) => {return {title : e.title, theme : e.theme}})
        openDayDetail({filteredEvents, title : moment(date).format("D MMM YYYY")})
    }

    const isToday = (date: any) => {
        return moment(date).isSame(moment(), 'day');
    }

    const isDifferentMonth = (date: any) => {
        return moment(date).month() != moment(firstDayOfMonth).month() 
    }

    const getPrevMonth = (event: any) => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfPrevMonth)
        setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
    };

    const getCurrentMonth = (event: any) => {
        const firstDayOfCurrMonth = moment().startOf('month');
        setFirstDayOfMonth(firstDayOfCurrMonth)
        setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
    };

    const getNextMonth = (event: any) => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfNextMonth)
        setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
    };
 
    return(
        <>
      <div className="w-full  bg-base-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex  justify-normal gap-2 sm:gap-4">
          <p className="font-semibold text-xl w-48">
            {moment(firstDayOfMonth).format("MMMM yyyy").toString()}<span className="text-xs ml-2 ">Beta</span>
          </p>

                    <Button
                      className="btn  btn-square btn-sm btn-ghost"
                      onPress={(event) => getPrevMonth(event)}
                    >
                      <ChevronLeftIcon
                        className="w-5 h-5"
                      />
                    </Button>
                    <Button
                      className="btn  btn-sm btn-ghost normal-case"
                      onPress={(event) => getCurrentMonth(event)}
                    >
                      Current Month
                    </Button>
                    <Button
                      className="btn btn-square btn-sm btn-ghost"
                      onPress={(event) => getNextMonth(event)}
                    >
                      <ChevronRightIcon
                        className="w-5 h-5"
                      />
                    </Button>
            </div>
            <div>
                <Button className="btn  btn-sm btn-ghost btn-outline normal-case" onPress={() => addNewEvent()}>Add New Event</Button>
            </div>
            
        </div>
        <div className="my-4 divider" />
        <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
          {weekdays.map((day, key) => {
            return (
              <div  className="text-xs capitalize" key={key}>
                {day}
              </div>
            );
          })}
        </div>

             
        <div className="grid grid-cols-7 mt-1  place-items-center">
          {allDaysInMonth().map((day, idx) => {
            return (
              <div key={idx} className={colStartClasses[Number(moment(day).day())] + " border border-solid w-full h-28  "}>
                <p className={`inline-block flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${isToday(day) && " bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white"} ${isDifferentMonth(day) && " text-slate-400 dark:text-slate-600"}`} onClick={() => addNewEvent(day)}> { moment(day).format("D") }</p>
                {
                    getEventsForCurrentDate(day).map((e, k) => {
                        return <p key={k} onClick={() => openAllEventsDetail(day, e.theme)} className={`text-xs px-2 mt-1 truncate  ${THEME_BG[e.theme] || ""}`}>{e.title}</p>
                    })
                }
              </div>
            );
          })}
        </div>

   
      </div>
        </>
    )
}

export default CalendarView;