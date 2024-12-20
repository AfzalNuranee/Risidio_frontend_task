import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Tooltip, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { postObj } from '.';
function AddEditPost({ postitem, closeModal,modal,getResponseBack }) {

    const [postData, setpostData] = useState( postitem ? postitem : postObj)
    const [isLoading, setLoading] = useState(false);

  console.log("postData--",postData)
    const onFieldChange = (key, value) => {
        // debugger
        setpostData({
            ...postData,
            [key]: value
        })

    }
    const savePostData = () => {
        debugger
         let payload = Object.assign({}, postData)
        
        if (payload?.id) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${payload?.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  id: payload?.id,
                  title:payload?.title,
                  body: payload?.body,
                  userId: payload?.userId,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((response) => response.json()).then((json) => getResponseBack(), closeModal(),alert("Edit Success"));
        } else {
            fetch('https://jsonplaceholder.typicode.com/posts/', { method: 'POST',body: JSON.stringify(payload),headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
            .then((response) => response.json())
            .then((json) => getResponseBack(), closeModal(),alert("Add Success"));
        }
    }

    return (
        <>
            <Dialog
                open={modal?.modal}
                className='records-dataroom-modal'
                maxWidth='md'
            >
                <DialogTitle id="scroll-dialog-title">{modal?.mode === 'add' ? "ADD" : "view"} Post Data</DialogTitle>
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
                                //  disabled={viewMode}
                                options={[]}
                                // getOptionSelected={(option) => option || ''}
                                getOptionLabel={option => option || ''}
                                value={postData?.completed}
                                multiple={true}
                                renderInput={params => <TextField  placeholder="Enter Yes/No" {...params}  label="Completed" margin="normal" fullWidth InputLabelProps={{ shrink: true }} variant='outlined' />}
                                onChange={() => { onFieldChange('completed') }}
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