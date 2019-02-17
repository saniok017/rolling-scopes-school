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
});

function SimpleTable(props) {
  const {
    classes,
    mentorName,
    data,
    tasks,
  } = props;

  const students = {};
  const status = [];

  data.forEach((row) => {
    // Object.assign(tasks, { [row.taskName]: row.taskName });
    Object.assign(students, { [row.studentNickName]: { [row.taskName]: row.taskStatus } });
  });
  // const taskArray = Object.keys(tasks);
  const rows = Object.keys(students);
  console.dir(students);

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
          {rows.map(row => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              {tasks.map(task => <TableCell align="left">{task.status}</TableCell>)}
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
