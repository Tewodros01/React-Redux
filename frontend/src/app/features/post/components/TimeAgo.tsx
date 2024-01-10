import { formatDistanceToNow, parseISO } from "date-fns";

interface TimeAgoProps {
  timeStamp?: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timeStamp }) => {
  let timeAgo = "";

  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
