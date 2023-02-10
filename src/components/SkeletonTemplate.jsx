import React from "react";
import { Skeleton } from '@mui/material';


const SkeletonTemplate = () => {
    let divTemplates = [];

    for(let i = 0; i < 20; i++){
        divTemplates.push(
            <div className="w-1/2 " key={i}>      
                <Skeleton variant="rectangular" width="250px" height="90%"  style={{background: 'rgba(201, 201, 201, .3)'}}/>                  
                <Skeleton width="50%" style={{background: 'rgba(201, 201, 201, .3)'}}/>
            </div>
        )
    }

    return divTemplates;

}



export default SkeletonTemplate;