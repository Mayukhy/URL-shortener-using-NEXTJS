import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Tooltip } from '@mui/material';
import { FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { useGetUrlsQuery } from '@/redux/api/api';
import { toast } from 'react-toastify';
import isURL from 'validator/lib/isURL';
export default function AddModal({urlIPdata,setUrlIPData,addUrl,singleUser}) {
  const [open, setOpen] = React.useState(false);
  const [isValid,setIsValid] = React.useState(false)
  console.log(urlIPdata)

  const {data:urls} = useGetUrlsQuery()

  // checking the validity of url
  React.useEffect(()=>{
    const valid = isURL(urlIPdata?.actualUrl);
    setIsValid(valid); 
  },[urlIPdata])


  //only myurls
  const myUrls = urls?.filter((item)=>item?.userId === singleUser?._id)

  return (
    <React.Fragment>
      <Tooltip
      onClick={()=>{
        setUrlIPData({...urlIPdata,userId:`${singleUser?._id}`})
        setOpen(true)}}
      followCursor title={
            <React.Fragment>
            <Typography color="inherit">{'Add new url'}</Typography>
          </React.Fragment>
}>

<div className=' border-[2px] pt-5 bg-zinc-300 text-black justify-center hover:text-indigo-800 flex h-[60px] w-[60px]  hover:border-indigo-800 transition-all duration-200 cursor-pointer border-zinc-700 rounded-full'>
<svg
className=' scale-[2]'
width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
</svg>
</div>

</Tooltip>
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
            Creat your URL
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();         
              if (
              myUrls?.find((item)=>item?.name === urlIPdata?.name || item?.actualUrl === urlIPdata?.actualUrl )
              ) {
                toast.error('Url or urlname is already used')
              }
              else if(
                myUrls?.find((item)=>item?.name !== urlIPdata?.name || item?.actualUrl !== urlIPdata?.actualUrl ) &&
                !isValid
              ){
                toast.error('Please type a valid url')
              }
              else{
                addUrl()
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
                >Actual Url</FormLabel>
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
                >Name</FormLabel>
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
              <Button className=' bg-indigo-600' type="submit">Short Url</Button>
            </Stack>
          </form>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}