import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid,} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { postObj } from '.';
function AddEditPost({ postitem, closeModal, modal, savePost }) {
    const [postData, setpostData] = useState(postitem ? postitem : postObj)

    const onFieldChange = (key, value) => {
        setpostData({
            ...postData,
            [key]: value
        })

    }
    const savePostData = () => {
        savePost(postData)
    }

    return (
        <>
            <Dialog
                open={modal?.modal}
                className='post-modal'
                maxWidth='md'
            >
                <DialogTitle id="scroll-dialog-title">{modal?.mode === 'add' ? "ADD" : "EDIT"} Post Data</DialogTitle>
                <DialogContent dividers={true}>
                    <Grid container spacing={1}>
                        <Grid item sm={6} xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                margin='normal'
                                label="Title"
                                id="title"
                                fullWidth
                                inputProps={{ maxLength: 255 }}
                                value={postData?.title}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => onFieldChange("title", e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6}>
                            <Autocomplete
                                options={[{ label: 'YES', value: true }, { label: 'NO', value: false }]}
                                getOptionLabel={option => option?.label}
                                value={postData?.completed ? { label: 'YES', value: true } : { label: 'NO', value: false }}
                                renderInput={params => <TextField placeholder="Enter Yes/No" {...params} label="Completed" margin="normal" fullWidth InputLabelProps={{ shrink: true }} variant='outlined' />}
                                onChange={(e, value) => onFieldChange('completed', value?.value)}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <TextField
                                variant="outlined"
                                margin='normal'
                                label="Body"
                                id="body"
                                fullWidth
                                inputProps={{ maxLength: 255 }}
                                value={postData?.body}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => onFieldChange("body", e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button size='small' on onClick={closeModal} color="primary" variant="outlined">{'Close'}</Button>
                    <Button size='small' on onClick={savePostData} color="primary" variant="contained">{'Save'}</Button>

                </DialogActions>
            </Dialog>
        </>
    )
}
export default AddEditPost