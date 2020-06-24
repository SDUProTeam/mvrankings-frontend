import React from 'react'
import { forwardRef } from 'react'
import { Paper, Tabs, Tab, Box, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { userLogin, userReg } from '../api/api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '48px 0',
        padding: 16,
        maxWidth: 500,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: 400,
        [theme.breakpoints.down(500)]: {
            transform: 'none',
            left: 'unset',
            margin: 24,
            minWidth: 0
        }
    },
    input: {
        width: '100%',
        margin: '16px 0'
    },
    button: {
        marginTop: 16,
        marginLeft: 16
    }
}))

function AccountDialog(props, ref) {
    const [value, setValue] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        username: '',
        phone: '',
        pwd: ''
    })

    const classes = useStyles()

    const handleChange = (event, newValue) => {
        if (!loading) {
            setValue(newValue);
        }
    };

    const onFormChange = (event) => {
        var newValue = event.target.value
        switch(event.target.id) {
            case 'username':
                newValue = newValue.replace(/ /g, '').substring(0, 20)
                setFormData(prev => ({...prev, username: newValue}))
                break
            case 'phone':
                newValue = newValue.replace(/[^0-9]/g, '').substring(0, 11)
                setFormData(prev => ({...prev, phone: newValue}))
                break
            case 'pwd':
                newValue = newValue.replace(/ /g, '').substring(0, 20)
                setFormData(prev => ({...prev, pwd: newValue}))
                break
            default:
                break
        }
    }

    const handleClose = () => {
        if (!loading) {
            props.loginState.loginClose()
        }
    }

    const handleLogin = () => {
        setLoading(true)
        userLogin(formData.username, formData.pwd, res => {
            setLoading(false)
            
            if (res.success) {
                handleClose()
                props.loginState.loginChange()
                alert('登录成功')
            } else {
                alert(res.msg)
            }
        })
    }

    const handleReg = () => {
        setLoading(true)
        userReg(formData.username, formData.phone, formData.pwd, res => {
            setLoading(false)
            
            if (res.success) {
                handleClose()
                props.loginState.loginChange()
                alert('注册成功')
            } else {
                alert(res.msg)
            }
        })
    }
    

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                centered
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}>
                <Tab label="登录" />
                <Tab label="注册" />
            </Tabs>
            <TabPanel value={value} index={0}>
                
                <form noValidate autoComplete="off" style={{ width: "100%" }}>
                    <TextField
                        id="username"
                        label="用户名/手机号"
                        placeholder="用户名/手机号"
                        color="primary"
                        onChange={onFormChange}
                        className={classes.input}
                        value={formData.username}
                        disabled={loading}
                    />
                    <TextField
                        id="pwd"
                        label="密码"
                        placeholder="密码"
                        color="primary"
                        type="password"
                        onChange={onFormChange}
                        className={classes.input}
                        value={formData.pwd}
                        disabled={loading}
                    />
                    
                    <div style={{ textAlign: 'right' }}>
                        <Button
                            className={classes.button}
                            onClick={handleClose}
                            disabled={loading}
                            variant="contained"
                            color="default"
                        >
                            关闭
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={handleLogin}
                            disabled={loading}
                            variant="contained"
                            color="primary"
                        >
                            登录
                        </Button>
                    </div>
                    
                </form>

            </TabPanel>
            <TabPanel value={value} index={1}>
                 
            <form noValidate autoComplete="off" style={{ width: "100%" }}>
                    <TextField
                        id="username"
                        label="用户名"
                        placeholder="用户名"
                        color="primary"
                        onChange={onFormChange}
                        className={classes.input}
                        value={formData.username}
                        disabled={loading}
                    />
                    <TextField
                        id="phone"
                        label="手机号（可选）"
                        placeholder="手机号（可选）"
                        color="primary"
                        onChange={onFormChange}
                        className={classes.input}
                        value={formData.phone}
                        disabled={loading}
                    />
                    <TextField
                        id="pwd"
                        label="密码"
                        placeholder="密码"
                        color="primary"
                        type="password"
                        onChange={onFormChange}
                        className={classes.input}
                        value={formData.pwd}
                        disabled={loading}
                    />
                    
                    <div style={{ textAlign: 'right' }}>
                        <Button
                            className={classes.button}
                            onClick={handleClose}
                            disabled={loading}
                            variant="contained"
                            color="default"
                        >
                            关闭
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={handleReg}
                            disabled={loading}
                            variant="contained"
                            color="secondary"
                        >
                            注册
                        </Button>
                    </div>
                    
                </form>

            </TabPanel>
        </Paper>
    )
}

export default forwardRef(AccountDialog)