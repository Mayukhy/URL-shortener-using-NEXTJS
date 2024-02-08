import * as React from 'react';
import UrlBody from './UrlBody';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import isURL from 'validator/lib/isURL';
import { DialogActions, Divider, FormControl, FormLabel, Input, ModalDialog, Stack,DialogContent, DialogTitle, CircularProgress } from '@mui/joy';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useGetUrlsQuery } from '@/redux/api/api';

export default function UrlTable({urlArray,singleUser}) {
  const URLS = useGetUrlsQuery()
  const {isFetching} = useGetUrlsQuery()
  const [open,setOpen] = React.useState(false)
  const [delOpen,setDelOpen] = React.useState(false)
  const [isValid,setIsValid] = React.useState(false)
  const [urlIPdata,setUrlIPData] = React.useState({
  name:'',
  actualUrl:'',
  id:''
  })
  console.log('updated new is here',urlIPdata)

    // checking the validity of url
    React.useEffect(()=>{
      const valid = isURL(urlIPdata?.actualUrl);
      setIsValid(valid); 
    },[urlIPdata])
 
    //for editing the url
  const updateUrl=()=>{
    const update=async()=>{
        await axios.put('/api/url',urlIPdata)
        .then(({data})=>{
         toast.success('Data is updated')
         console.log('data is here',data)
         URLS.refetch()
        })
        .catch(()=>{
         toast.error('Something went wrong')
        })
    }
    update()

  }
   //for deleting the url
  const delUrl=()=>{
    const del=async()=>{
        await axios.delete(`/api/url/${urlIPdata?.id}`)
        .then(({data})=>{
         toast.success('Data is deleted')
         console.log('data is here',data)
         URLS.refetch()
        })
        .catch(()=>{
         toast.error('Something went wrong')
        })
    }
    del()

  }


    return (

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
 
 {/* model for deleting the Url */}
<Modal open={delOpen} onClose={() => setDelOpen(false)}>
        <ModalDialog
                  sx={{
                    bgcolor:'#38333d',
                    width: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                    border:'none',
                    color:'white'
                  }}
        variant="outlined" role="alertdialog">
          <DialogTitle>
          <svg
          className=' flex items-center mt-1.5'
          width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent
          sx={{
            color:'whitesmoke'
          }}
          >
            Are you sure you want to delete this url?
          </DialogContent>
          <DialogActions>
            <Button
            variant="solid" color="danger"
             onClick={() => {
              delUrl()
              setDelOpen(false)}}>
              Delete Url
            </Button>
            <Button
            sx={{
              backgroundColor:'white'
            }}
            variant="plain" color="neutral" onClick={() => setDelOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    {/* model for editing the url data */}
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            bgcolor:'#38333d',
            width: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            border:'none'
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
          sx={{
            color:'white'
          }}
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Edit your URL
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();         
             if(
                !isValid
              ){
                toast.error('Please type a valid url')
              }
              else{
                updateUrl()
                setOpen(false);
              }

            }}
          >
            <Stack
                      sx={{
                        color:'white'
                      }}
            spacing={2}>
              <FormControl>
                <FormLabel
                          sx={{
                            color:'whitesmoke',
                           
                          }}
                >Change Url</FormLabel>
                <Input
                value={urlIPdata?.actualUrl}
                onChange={(e)=>setUrlIPData({...urlIPdata,actualUrl:e.target?.value})}
                placeholder='type url..'
                  sx={{
                    color:'whitesmoke',
                    background:'transparent'
                  }}
                autoFocus required />
              </FormControl>
              <FormControl
              >
                <FormLabel
                                          sx={{
                                            color:'whitesmoke'
                                          }}
                >Change Name</FormLabel>
                <Input
                value={urlIPdata?.name}
                onChange={(e)=>setUrlIPData({...urlIPdata,name:e.target?.value})}
                  placeholder='type name..'
                  sx={{
                    color:'whitesmoke',
                    background:'transparent'
                  }}
                required />
              </FormControl>
              <Button className=' bg-indigo-600' type="submit">Update Url</Button>
            </Stack>
          </form>
        </Sheet>
      </Modal>
    
{
!isFetching ?
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Url name
                </th>
                <th scope="col" className="px-6 py-3">
                    Actual Url
                </th>
                <th scope="col" className="px-6 py-3">
                    Sort Url
                </th>
                <th scope="col" className="px-6 py-3">
                    Clicks
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {urlArray?.map((item,idx)=>(
            <UrlBody
            setDelOpen={setDelOpen}
            setUrlIPData={setUrlIPData}
            setOpen={setOpen}
            singleUser={singleUser}
            item={item}/>
            ))}


        </tbody>
    </table>:
    <div className=' w-full justify-center flex items-center mt-10'>
    <CircularProgress size='lg' variant="plain" />
    </div>
    }
</div>

  );
}