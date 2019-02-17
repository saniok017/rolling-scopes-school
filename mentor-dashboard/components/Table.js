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
});

function choosePaint(studentName, task, classes) {
  if (task.taskStatus === 'ToDo') return classes.gray;
  if (task.taskStatus === 'In Progress') return classes.yellow;
  if (task.taskStatus === 'Checking') return classes.red;
  return classes.green;
}

function makeRows(data) {
  const students = {};

  data.forEach((row) => {
    const currentStudent = row.studentNickName;
    if (!students.currentStudent) Object.assign(students, { [currentStudent]: [] });
    else students.currentStudent.concat([row.recordTaskName]);
  });

  console.dir(students);
  return Object.keys(students);
}

function SimpleTable(props) {
  const {
    classes,
    mentorName,
    data,
    tasks,
  } = props;

  const rows = makeRows(data);

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
                  className={choosePaint(studentName, task, classes)}
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
