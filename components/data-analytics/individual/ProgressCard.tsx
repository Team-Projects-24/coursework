/**
 *
 * @author Olivia Gray
 *
 * @description provides template for progress bar for analysing an individual's or team's performance
 *
 */

import {Grid, Card, Typography} from '@mui/material'
interface Props {
    data: any;
  }
  
  function ProgressCard({ data }: Props) {
    let percentage = Math.trunc((data?.manHoursCompleted / data?.manHoursSet) * 100);

    const containerStyles = {
        height: 20,
        width: '90%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 25
    }

    const fillerStyles = {
        height: '100%',
        width: percentage*10,
        backgroundColor: '#6a1b9a',
        borderRadius: 'inherit',
    }


    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    const hourStyles = {
        margin: 10,
        padding: 10,
    }

    return (
        <Card variant="outlined" style={hourStyles}>
            <div>
                <div>
                    <Typography variant="h5">{`${data?.name}`}</Typography>
                    <Typography>Hours Set: {`${data?.manHoursSet}`}</Typography>
                    <Typography>Completed: {`${data?.manHoursCompleted}`}</Typography>
                    <Typography>ToDo: {`${data?.manHoursSet - data?.manHoursCompleted}`}</Typography>
                </div>
                <div style={containerStyles}>
                    <div style={fillerStyles}>
                        <span style={labelStyles}>{`${percentage}%`}</span>
                    </div>
                </div>
            </div>
        </Card>
    );


  }
  
  export default ProgressCard;
  