import React from "react";
import { Skeleton } from '@mui/material';


const SkeletonTemplate = () => (
    <>
        <div className="w-1/5">      
            <Skeleton variant="rectangular" width="100%" height="80%"  style={{background: 'rgba(201, 201, 201, .3)'}}/>                  
            <Skeleton width="20%" style={{background: 'rgba(201, 201, 201, .3)'}}/>
        </div>

        <div className="w-1/5">                        
            <Skeleton variant="rectangular" width="100%" height="80%"  style={{background: 'rgba(201, 201, 201, .3)'}}/>         
            <Skeleton width="20%" style={{background: 'rgba(201, 201, 201, .3)'}}/>
        </div>

        <div className="w-1/5">
            <Skeleton variant="rectangular" width="100%" height="80%"  style={{background: 'rgba(201, 201, 201, .3)'}}/>                                 
            <Skeleton width="20%" style={{background: 'rgba(201, 201, 201, .3)'}}/>
        </div>

        <div className="w-1/5">
            <Skeleton variant="rectangular" width="100%" height="80%"  style={{background: 'rgba(201, 201, 201, .3)'}}/>                                 
            <Skeleton width="20%" style={{background: 'rgba(201, 201, 201, .3)'}}/>
        </div>

        <div className="w-1/5">                        
            <Skeleton variant="rectangular" width="100%" height="80%"  style={{background: 'rgba(201, 201, 201, .3)'}}/>         
            <Skeleton width="20%" style={{background: 'rgba(201, 201, 201, .3)'}}/>
        </div>
    </>
)

export default SkeletonTemplate;