import { CALENDAR_EVENT_STYLE } from "@/features/calendar/components/CalendarView/util";


const THEME_BG = CALENDAR_EVENT_STYLE;
type CalendarEventTheme = keyof typeof CALENDAR_EVENT_STYLE;

interface CalendarEvent {
  title: string;
  theme: CalendarEventTheme;
}

interface CalendarEventsBodyRightDrawerProps {
  filteredEvents: CalendarEvent[];
}

function CalendarEventsBodyRightDrawer({filteredEvents}: CalendarEventsBodyRightDrawerProps){
  return(
    <>
      {
        filteredEvents.map(
          (e, k) => {
            return (
              <div
                key={k}
                className={`grid mt-3 rounded-lg p-3 shadow bg-white ${THEME_BG[e.theme] || ""}`}
              >
                {e.title}
              </div>
            );
          }
        )
      }
    </>
  )
}

export default CalendarEventsBodyRightDrawer;