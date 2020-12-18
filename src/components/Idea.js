import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import { editIdea, storeIdea } from '../redux/idea/ideaActions';
import Comments from './Comments';
import clsx from 'clsx';
import { getComment } from '../redux/comment/commentActions';

const useStyles = theme => ({
  root: {
    maxWidth: 345,
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  // expand: {
  //   transform: 'rotate(0deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
});

class Idea extends Component {
  state = {
    isInEditMode: false,
    currentIdea: {
      idea: this.props.idea.idea,
      description: this.props.idea.description,
    },
    expended: true,
    visible: false,
    comments: this.props.comments,
  };
  toggleComments = () => {
    // console.log('COMMMMMMMMMMMEEEEEENNNNNNNNTSSSSSSS', this.props.comments);
    // if (this.state.comments)
    this.setState({ visible: !this.state.visible });
    // this.props.showComments(this.props.idea.id);

    // this.props.storeCurrentIdea(this)
  };
  // handleExpandClick = () => {
  //   this.setState({
  //     expended: !this.state.expended,
  //   });
  // };

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    });
  };
  onEditIdea = () => {
    console.log('CURRENT_IDEA ', this.state.currentIdea);
    const token = localStorage.getItem('token');

    this.props.editIdea(this.props.idea.id, this.state.currentIdea, token);
    this.setState({ isInEditMode: false });
  };

  handleChange = e => {
    const currentIdea = { ...this.state.currentIdea };
    currentIdea[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ currentIdea });
  };

  render() {
    console.log(this.props);
    console.log(this.props.currentUser);
    const { idea, classes } = this.props;
    const { currentIdea } = this.state;

    return this.state.isInEditMode ? (
      <Card className={classes.root}>
        <CardContent>
          Title:
          <TextField
            // value={idea.idea}
            onChange={this.handleChange}
            defaultValue={idea.idea}
            variant='outlined'
            margin='normal'
            fullWidth
            id='idea'
            label='Edit Idea'
            name='idea'
            autoFocus
          />
          Description:
          <TextField
            // value={idea.description}
            onChange={this.handleChange}
            defaultValue={idea.description}
            variant='outlined'
            margin='normal'
            fullWidth
            id='description'
            label='Edit Description'
            name='description'
            autoFocus
          />
        </CardContent>
        <CardActions>
          <Button
            disabled={
              currentIdea.idea === idea.idea &&
              currentIdea.description === idea.description
            }
            color='primary'
            variant='contained'
            onClick={this.onEditIdea}
          >
            Save
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={this.changeEditMode}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    ) : (
      <Card className={classes.root}>
        <CardContent>
          Title:
          <Typography variant='h5' component='h2'>
            {idea.idea}
          </Typography>
          Description:
          <Typography variant='h5' component='h2'>
            {idea.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            onClick={this.toggleComments}
            // className={clsx(classes.expand, {
            //   [classes.expandOpen]: this.state.expanded,
            // })}
            // onClick={this.handleExpandClick}
            // aria-expanded={this.state.expanded}
            // aria-label='show more'
          >
            Comments
          </Button>

          {this.props.currentUser &&
            this.props.currentUser.id === idea.author.id && (
              <>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={this.changeEditMode}
                >
                  Edit
                </Button>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={this.props.onDelete}
                >
                  Delete
                </Button>
              </>
            )}
        </CardActions>
        {this.state.visible ? <Comments idea={this.props.idea} /> : null}

        {/* <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    // comments: state.comment.comments,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editIdea: (id, currentIdea, token) => {
      dispatch(editIdea(id, currentIdea, token));
    },
    storeCurrentIdea: idea => dispatch(storeIdea(idea)),
    showComments: id => dispatch(getComment(id)),
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Idea);
