import React from 'react'
import { Card, Typography, CardContent, CardActions, Button, TextField } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { userComment } from '../api/api'
import { withRouter } from 'react-router'

function CommentArea(props) {
    const [rating, setRating] = React.useState(7.0)
    const [ratingHover, setRatingHover] = React.useState(-1)
    const [comment, setComment] = React.useState('')
    
    const commentMaxLen = 300
    const commentMinLen = 10

    const handleSubmit = () => {
        if (comment.trim().length < commentMinLen) {
            alert('评论不能少于' + commentMinLen + '字')
        } else {
            userComment(rating, comment, res => {
                if (res.success) {
                    alert('评论成功')
                    props.history.replace('/detail/' + props.id)
                } else {
                    alert('评论失败\n' + res.err)
                }
            })
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>写评论</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                        name="rating"
                        value={rating}
                        precision={0.1}
                        size="large"
                        max={10}
                        min={0}
                        onChange={(e, v) => {
                            setRating(v)
                        }}
                        onChangeActive={(e, v) => {
                            setRatingHover(v)
                        }}
                    />
                    <span style={{marginLeft: 16}}>{ratingHover !== -1 ? ratingHover : rating}</span>
                </div>
                <div style={{ marginTop: 16, width: '100%' }}>
                    <TextField
                        id="user-comment"
                        multiline
                        variant="outlined"
                        rows={4}
                        placeholder={props.loginState.data.login ? "写评论..." : "登录后发表评论"}
                        value={comment}
                        style={{ width: '100%' }}
                        disabled={!props.loginState.data.login}
                        helperText={`${comment.length} / ${commentMaxLen}`}
                        onChange={(e) => {
                            setComment(e.target.value.substring(0, commentMaxLen))
                        }}
                    />
                </div>
            </CardContent>
            <CardActions>
                <div style={{flex: 1}}></div>
                {props.loginState?.data?.login ?? false ? (
                    <Button variant="contained" color="primary" onClick={() => handleSubmit()}>发布</Button>
                ) : (
                    <Button disabled={true} variant="contained" color="primary">登录后允许发布</Button>
                )}
                
            </CardActions>
        </Card>
    )
}

export default withRouter(CommentArea)