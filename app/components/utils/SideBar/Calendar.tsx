
// import { useState } from "react";


// const Calendar = () => {
//     const [current_date, set_current_date] = useState(new Date());
//     const [selected_date, set_selected_date] = useState<Date | null>(null);

//     const get_days_in_month = (month: number, year: number) => {
//         return new Date(year, month, 0).getDate();
//     };

//     const get_first_day_of_month = (month: number, year: number) => {
//         return new Date(year, month, 1).getDay();
//     };

//     const change_month = (direction: "prev" | "next") => {
//         const new_date = new Date(current_date);
//         new_date.setMonth(current_date.getMonth() + (direction === "next" ? 1 : -1));
//         set_current_date(new_date);
//     }

//     const handle_date_click = (day: number) => {
//         const new_selected_date = new Date(current_date);
//         new_selected_date.setDate(day);
//         set_selected_date(new_selected_date);
//     }

//     const current_month = current_date.getMonth();
//     const current_year = current_date.getFullYear();
//     const first_day = get_first_day_of_month(current_month, current_year);
//     const days_in_month = get_days_in_month(current_month + 1, current_year);

//     const days = Array.from({ length: first_day }, (_, i) => null);
//     for (let i = 1; i <= days_in_month; i++)
//         days.push(i);



//     return (
//         <div className="max-w-sm mx-auto p-4">
//           {/* Calendar Header */}
//           <div className="flex items-center justify-between mb-4">
//             <button
//               onClick={() => change_month("prev")}
//               className="text-xl font-semibold text-gray-700 hover:text-gray-900"
//             >
//               &lt;
//             </button>
//             <div className="text-xl font-semibold text-gray-800">
//               {current_date.toLocaleString("default", { month: "long" })} {current_year}
//             </div>
//             <button
//               onClick={() => change_month("next")}
//               className="text-xl font-semibold text-gray-700 hover:text-gray-900"
//             >
//               &gt;
//             </button>
//           </div>
    
//           {/* Calendar Days */}
//           <div className="grid grid-cols-7 gap-1 text-center transition-transform duration-500 ease-in-out
//           ">
//             <div className="text-sm font-semibold text-gray-600">Sun</div>
//             <div className="text-sm font-semibold text-gray-600">Mon</div>
//             <div className="text-sm font-semibold text-gray-600">Tue</div>
//             <div className="text-sm font-semibold text-gray-600">Wed</div>
//             <div className="text-sm font-semibold text-gray-600">Thu</div>
//             <div className="text-sm font-semibold text-gray-600">Fri</div>
//             <div className="text-sm font-semibold text-gray-600">Sat</div>
    
//             {/* Calendar Grid */}
//             {days.map((day, index) => (
//               <div
//                 key={index}
//                 className={`p-2 cursor-pointer rounded-lg ${
//                   day ? (selected_date?.getDate() === day ? "bg-blue-500 text-white" : "hover:bg-gray-200") : "bg-transparent"
//                 }`}
//                 onClick={() => day && handle_date_click(day)}
//               >
//                 {day || ""}
//               </div>
//             ))}
//           </div>
    
//           {/* Selected Date */}
//           {selected_date && (
//             <div className="mt-4 text-center text-lg font-medium text-gray-700">
//               Selected Date: {selected_date.toLocaleDateString()}
//             </div>
//           )}
//         </div>
//       );


// }

// export default Calendar;