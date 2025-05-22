import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';
export const classDataContext = createContext();
export const useClassDataContext = () => useContext(classDataContext);
export function ClassDataProvider({ children }) {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await api.get(`/classes`);
        setClassData(response.data);
        console.log(classData);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };
    fetchClassData();
  }, []);
  return (
    <classDataContext.Provider value={{ classData }}>
      {children}
    </classDataContext.Provider>
  );

  // useEffect(() => {
  //   const fetchClassData = async () => {
  //     try {
  //       const response = await api.get(`/classes`);
  //       const classes = response.data;

  //       // Duyệt từng class để fetch student data
  //       const enrichedClasses = await Promise.all(
  //         classes.map(async (cls) => {
  //           const studentData = await Promise.all(
  //             cls.students.map(async (studentId) => {
  //               try {
  //                 const res = await api.get(`/students/${studentId}`);
  //                 return res.data;
  //               } catch (error) {
  //                 console.error('Error fetching student data:', error);
  //                 return null; // để tránh Promise bị reject
  //               }
  //             })
  //           );
  //           return {
  //             ...cls,
  //             studentData,
  //           };
  //         })
  //       );

  //       setClassData(enrichedClasses);
  //     } catch (error) {
  //       console.error('Error fetching class data:', error);
  //     }
  //   };

  //   fetchClassData();
  // }, []);
}
