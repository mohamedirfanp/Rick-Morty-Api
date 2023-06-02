import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './DashboardComponent.css';
import { useQuery } from 'react-query';

function DashboradComponent() {

    axios.defaults.baseURL = 'https://rickandmortyapi.com/api/'
    
    const [page,setUpdatePage] = useState(1);
    const totalPages = useRef(0);

    const getData = async ({queryKey}) =>
    {
        let res = await axios.get(`character\?page=${queryKey[1]}`);
        totalPages.current = res.data.info.pages;
        // let response =  await res.json();
        
        // .then(response => {
        //     totalPages = response.data.info.pages;
        //     console.log(response.data.results)
           
        //    return response.data.results;
        // })
        // .catch(error => {
        //     console.error(error);
        // })
        return res.data.results;
    }

    // useEffect(() => {
      
    //     axios.get().
      
    // }, [page])

    const {data, status} = useQuery(['characters', page], getData)

    
    if(status === 'loading')
    return <p>Loading...</p>

    else if(status === 'error')
    return <p>Error!!!</p>

    // if(!data) return <p>Loading...</p>

  return (
    <React.Fragment>
        <h1>Rick And Morty </h1>    

        <section className="container">
            {
                data.map((character,index) => {
                    return (
                        <div className='card' key={index}>
                            <div className='left-image' style={{backgroundImage: `url("${character.image}")`}}>
                            </div>

                            <div className='right-content'>
                                <div className='section'>
                                    <h4>{character.name}</h4>
                                    <span className='status'>
                                        <span className={character.status === 'Alive' ? 'status-icon-alive' : 'status-icon-dead'}></span>
                                        <span>{character.status} - {character.species}</span>
                                    </span>
                                </div>
                                <div className='section'>
                                    <span className='text-gray'>Last Known location:</span>
                                    <span>{character.location.name}</span>
                                </div>

                                <div className='section'>
                                    <span className='text-gray'>First seen in</span>
                                    <span>{character.origin.name}</span>
                                </div>

                                
                            </div>

                        </div>
                    )
                })
            }
        </section>
        <section className='pagination'>
            {page !== 1 ? <button className='btn previous' onClick={ () => setUpdatePage(page - 1)}>Previous Page</button> : <button className='btn btn-primary' disabled>Previous Page</button>}
            {page !== totalPages.current ? <button className='btn next' onClick={() => setUpdatePage(page + 1)}>Next Page</button> : <button className='btn btn-primary' disabled>Next Page</button>}
        </section>

    </React.Fragment>
  )
}

export default DashboradComponent
