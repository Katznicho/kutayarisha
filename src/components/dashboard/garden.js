import React from "react";
import Datatable from "./datatable";
import Avatars from "./avatars";
import Flag from "../flag";
import data from "../../json/dashboard-table.json";
import { formatNumber } from "../../functions/numbers";
import { ProgressBar } from "../progress-bars";

const Markets = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Crops",
        accessor: "country",
        Cell: (props) => {
          let { code, name } = { ...props.value };
          return (
            <>
              <Flag size="sm" code={code} />
              <span className="ml-2">{name}</span>
            </>
          );
        },
      },

      {
        Header: "Seasons",
        accessor: "population",
        Cell: (props) => <span>{formatNumber(props.value)}</span>,
      },
      {
        Header: "Size",
        accessor: "members",
        Cell: (props) => <Avatars items={props.value} />,
      },
      {
        Header: "Plant Size",
        accessor: "progress",
        Cell: (props) => {
          let { color, value } = { ...props.value };
          return (
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center justify-around">
                <ProgressBar width={value} color={color} />
                <span className="ml-1 text-grey-500">{value}%</span>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          let { code, name } = { ...props.value };
          return (
            <>
              <Flag size="sm" code={code} />
              <span className="ml-2">{name}</span>
            </>
          );
        },
      },
    ],
    []
  );
  const items = React.useMemo(() => data, []);
  return <Datatable columns={columns} data={items} />;
};

export default Markets;
