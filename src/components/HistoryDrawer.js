import React from 'react'
import { Divider, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { userHistory } from '../api/api'
import { MobileCardItemWithRouter } from './SquareList'
import './HistoryDrawer.css'
import cookie from 'react-cookies'

class HistoryDrawer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            history: [],
            loading: true
        }
    }

    componentDidMount() {
        if (this.props.loginState.data.login) {
            // 加载历史
            userHistory(res => {
                if (res.success) {
                    this.setState({
                        history: res.history,
                        loading: false
                    })
                } else {
                    this.setState({
                        loading: false
                    })
                }
            })
        }
    }

    render() {
        if (!this.props.loginState.data.login) {
            return <></>
        }

        const handleClose = () => {
            this.props.onClose()
        }
    
        const loadingSection = (
            <Typography className="tip" variant="body1" color="textSecondary" component="div">加载中...</Typography>
        )
    
        const emptySection = (
            <Typography className="tip" variant="body1" color="textSecondary" component="div">无历史记录</Typography>
        )
    
        const dataSection = () => {
            return this.state.history.length === 0
                ? emptySection
                : this.state.history.map(h => (
                    <div className="item"  key={'hist-' + h.sourceId}>
                        <MobileCardItemWithRouter item={h}/>
                    </div>
                ))
        }

        return <div>
            <div className="toolbar">
                <IconButton
                    className="button"
                    color="inherit"
                    aria-label="close drawer"
                    onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">浏览历史</Typography>
            </div>
            <Divider />
            {
                this.state.loading ? loadingSection : dataSection()
            }
        </div>
        
    }
}

export default HistoryDrawer