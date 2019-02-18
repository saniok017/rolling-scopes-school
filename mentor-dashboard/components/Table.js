import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
  },
  gray: {
    backgroundColor: '#CCCCCC',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  green: {
    backgroundColor: '#D9EAD3',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  yellow: {
    backgroundColor: '#FFF2CC',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  red: {
    backgroundColor: '#EA9999',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  bardo: {
    backgroundColor: '#A61C00',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
});

function choosePaint(task, classes, checkedTasks) {
  if (task.taskStatus === 'ToDo') return classes.gray;
  if (task.taskStatus === 'In Progress') return classes.yellow;
  if (task.taskStatus === 'Checking' && !checkedTasks.includes(task.name)) return classes.red;
  if (task.taskStatus === 'Checked' && !checkedTasks.includes(task.name)) return classes.bardo;
  return classes.green;
}

function SimpleTable(props) {
  const {
    classes,
    mentorName,
    data,
    tasks,
  } = props;

  const rows = Object.keys(data);

  console.log(data);


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{mentorName}</TableCell>
            {tasks.map(task => <TableCell padding={'dense'} key={task.name} align="left">{task.name}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(studentName => (
            <TableRow key={studentName}>
              <TableCell component="th" scope="row">
                {studentName}
              </TableCell>
              {tasks.map(task => (
              <TableCell
                  className={choosePaint(task, classes, data[studentName])}
                  padding={'dense'}
                  key={task.name}
                  align="left">
                    {task.taskStatus}
              </TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
