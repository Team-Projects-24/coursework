import { Box, CardContent, Card, Divider, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import React from "react";

function screenSize(): boolean {
  if (window.innerWidth > 1000) {
    return true;
  } else {
    return false;
  }
}
interface IProps {
  title: string;
  total: number;
  completed: number;
  totalLabel: string;
  isHours?: boolean;
}
export const BarCard = ({
  title,
  total,
  completed,
  totalLabel,
  isHours = true,
}: IProps) => {
  const remaining = total - completed;
  const progress = Math.floor((completed / total) * 100);
  return (
    <Card
      elevation={2}
      className=" p-1 w-1/2 mobile-only:w-[90%] "
      sx={{ m: 2 }}
    >
      <CardContent className="py-4">
        <Typography
          sx={{ fontSize: 20 }}
          className="font-semibold "
          gutterBottom
        >
          {title}
        </Typography>
        <Divider />
        <br></br>
        <div className="flex flex-row desktop-only:gap-4 mobile-only:gap-2 justify-center">
          <Card
            elevation={2}
            className="w-1/3 px-2 text-left border-t-4 border-red-500"
          >
            <Typography
              className="py-4"
              sx={{ fontSize: screenSize() ? 15 : 12 }}
            >
              {totalLabel}
              <Typography
                className="flex flex-col font-bold"
                sx={{ fontSize: screenSize() ? 25 : 14 }}
              >
                {total} {isHours && (total === 1 ? "hour" : "hours")}
              </Typography>
            </Typography>
          </Card>
          <Card
            elevation={2}
            className="w-1/3 text-center border-t-4 border-green-500"
          >
            <Typography
              className=" py-4 text-left px-2"
              sx={{ fontSize: screenSize() ? 15 : 12 }}
            >
              Completed
              <Typography
                className="flex flex-col font-bold"
                sx={{ fontSize: screenSize() ? 25 : 14 }}
              >
                {completed} {isHours && (completed === 1 ? "hour" : "hours")}
              </Typography>
            </Typography>
          </Card>
          <Card
            elevation={2}
            className="w-1/3 text-center border-t-4 border-blue-500"
          >
            <Typography
              className=" py-4 text-left px-2 "
              sx={{ fontSize: screenSize() ? 15 : 12 }}
            >
              Remaining
              <Typography
                className="flex flex-col font-bold"
                sx={{ fontSize: screenSize() ? 25 : 14 }}
              >
                {remaining} {isHours && (remaining === 1 ? "hour" : "hours")}
              </Typography>
            </Typography>
          </Card>
        </div>
        <br></br>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            color="success"
            variant="determinate"
            value={isNaN(progress) ? 0 : progress}
          />
          <div className="text-right">{isNaN(progress) ? 0 : progress} %</div>
        </Box>
      </CardContent>
    </Card>
  );
};
