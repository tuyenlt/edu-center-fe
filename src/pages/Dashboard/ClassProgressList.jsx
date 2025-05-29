import CircularProgress from '@/components/shared/CircularProgress';
import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { getClassProgress } from '@/utils';
import { useEffect, useState } from 'react';

export default function ClassProgressList({ classes }) {
  return (
    classes && (
      <div className="bg-white p-4 rounded-lg shadow-md h-[396px] overflow-auto">
        <h2 className="font-semibold text-lg mb-4">Class Progress</h2>
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-blue-50 p-3 rounded-[10px] mb-4 flex justify-between items-center"
          >
            <div className="font-medium">{cls.class_name}</div>
            <CircularProgress percent={getClassProgress(cls)} size={60} />
          </div>
        ))}
      </div>
    )
  );
}
