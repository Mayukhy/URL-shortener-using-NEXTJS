'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AddUrl from '@/components/addurl/AddUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetUrlsQuery } from '@/redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenue } from '@/redux/slices/urlSlice';
import { Avatar, CircularProgress } from '@mui/joy';

interface Url {
  name: string;
  actualUrl: string;
  userId: string;
}

interface User {
  _id: string;
}

interface UrlData {
  smUrl: string;
  name: string;
  actualUrl: string;
  userId: string;
}

export default function Page() {
  const session = useSession();

  //color Array
  const colArray: string[] = [
    '#9c1910',
    '#6c9608',
    '#0f658c',
    '#2d0f8c',
    '#7a1a91',
    '#9e0d69',
    '#944b0c'
  ];

  //to get random color of the urls
  const randomCol = (): string => {
    return colArray[Math.floor(Math.random() * colArray.length)];
  };

  const [singleUser, setSingleUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { activeMenue } = useSelector((state) => state.url);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveMenue('Home'));
  }, [activeMenue]);
  const { data: urls, isFetching } = useGetUrlsQuery();
  const URLS = useGetUrlsQuery();
  //getting current user data
  useEffect(() => {
    const getSingleUser = async () => {
      await axios.get(`/api/user/${session?.data?.user?.email}`).then(({ data }) => {
        setSingleUser(data);
      });
    };
    getSingleUser();
  }, [session?.data?.user]);
  console.log(singleUser);

  // code to redirect to specific url
  const redirect = async (item: Url) => {
    await axios
      .put(`/api/url/${item?.smUrl}`, singleUser)
      .then(({ data }) => {
        toast.success('Success');
        console.log('dat is here', data);
        URLS.refetch();
      })
      .catch(() => {
        toast.error('Something went wrong');
      });

    await axios
      .get(`/api/url/short/${item?.smUrl}`)
      .then(({ data }) => {
        // toast.success('Redirects')
        console.log('dat is here', data);
        URLS.refetch();
      })
      .catch(() => {
        // toast.error('Something went wrong')
      });
  };

  const [urlArray, setUrlArray] = useState<Url[]>([]);

  const [urlIPdata, setUrlIPData] = useState<UrlData>({
    name: '',
    actualUrl: '',
    userId: ''
  });

  const getAllUrls = async () => {
    await axios.get(`/api/url`).then(({ data }) => setUrlArray(data));
  };
  useEffect(() => {
    getAllUrls();
  }, []);

  //filtering those urls which is created by the current user
  const myUrls = urls?.filter((item, id) => item?.userId === singleUser?._id);

  // filtering as per searchterm
  const searchUrls = myUrls?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.actualUrl?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  //adding url to array
  const addUrl = () => {
    const postUrl = async () => {
      await axios
        .post(`/api/url`, urlIPdata)
        .then(({ data }) => {
          toast.success('Url created Successfully');
          URLS.refetch();
          getAllUrls();
        })
        .catch(() => {
          toast.error('Please enter a valid Url');
        });
    };
    postUrl();
  };

  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (session?.status !== 'authenticated') {
      router.push('/');
    }
  }, [session]);
  return (
    <div className=' w-full flex flex-col relative'>
      <div className=' h-screen flex flex-col justify-center items-center'>
        {!isFetching ? (
          <>
            <p className=' font-bold text-4xl mb-2'>Url Shorter</p>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='
         transition-all duration-200
        focus:border-indigo-800 py-2 px-4 w-[500px] rounded-3xl outline-none border border-zinc-700 text-white bg-transparent'
              placeholder='Search your url..'
              type='text'
              name=''
              id=''
            />

            {!searchTerm ? (
              <div className=' grid grid-cols-4 mx-auto p-2 mt-3 w-[500px] '>
                {myUrls?.map((item) => (
                  <a
                    target='_blank'
                    href={`/api/url/short/${item?.smUrl}`}
                    onClick={() => redirect(item)}
                    className='
             transition-all duration-200
            flex flex-col gap-1 p-4 items-center hover:bg-zinc-700 rounded-lg'
                  >
                    <Avatar
                      sx={{
                        color: 'white',
                        bgcolor: randomCol(),
                        width: '60px',
                        height: '60px'
                      }}
                    >
                      {item?.name.slice(0, 1)}
                    </Avatar>
                    <p className=' text-center w-[70px] truncate text-xs'>{item.name}</p>
                  </a>
                ))}
                <AddUrl addUrl={addUrl} urlIPdata={urlIPdata} setUrlIPData={setUrlIPData} singleUser={singleUser} />
              </div>
            ) : (
              <div className=' grid grid-cols-4 mx-auto p-2 mt-3 w-[500px] '>
                {searchUrls?.length !== 0 ? (
                  <>
                    {searchUrls?.map((item) => (
                      <a
                        target='_blank'
                        href={`/api/url/short/${item?.smUrl}`}
                        onClick={() => redirect(item)}
                        className='
             transition-all duration-200
            flex flex-col gap-1 p-4 items-center hover:bg-zinc-700 rounded-lg'
                      >
                        <Avatar
                          sx={{
                            color: 'white',
                            bgcolor: randomCol(),
                            width: '60px',
                            height: '60px'
                          }}
                        >
                          {item?.name.slice(0, 1)}
                        </Avatar>
                        <p className=' text-center w-[70px] truncate text-xs'>{item.name}</p>
                      </a>
                    ))}
                  </>
                ) : (
                  <div className=' text-center flex w-[500px] items-center justify-center'>
                    <p>No urls are found</p>
                  </div>
                )}

                {searchUrls?.length > 0 && myUrls?.length && (
                  <AddUrl addUrl={addUrl} urlIPdata={urlIPdata} setUrlIPData={setUrlIPData} singleUser={singleUser} />
                )}
              </div>
            )}
          </>
        ) : (
          <CircularProgress size='lg' variant='plain' />
        )}
      </div>
    </div>
  );
}