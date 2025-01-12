import React from "react";
import { useGetGroupsTeacherQuery } from "../../context/api/groupApi";
import { Link } from "react-router-dom";

const GroupTeacher = () => {
  const { data: groups } = useGetGroupsTeacherQuery();
  console.log(groups);

  return (
    <div className="group">
      <div className="group__top">
        <h2 className="group__title">Gruhlar</h2>
      </div>
      <ul className="group__list">
        {groups?.map((group) => (
          <li key={group.id} className="group__item">
            <Link to={`/admin/groups/${group?.id}`}>
              <div className="group__item-info">
                <h3 className="group__name">{group.name}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupTeacher;
