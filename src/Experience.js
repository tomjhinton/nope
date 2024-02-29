import { useGLTF, OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState, useMemo} from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import vertexShaderB from './shaders/vertexB.js'
import fragmentShaderB from './shaders/fragmentB.js'

import vertexShaderF from './shaders/vertexF.js'
import fragmentShaderF from './shaders/fragmentF.js'



export default function Experience(){
 
    const brundel = useLoader(TextureLoader,  `Brundlefly.jpeg`)
    const frank = useLoader(TextureLoader,  `frank.jpg`)

    const floorC = useLoader(TextureLoader,  `floorC.png`)
    const floorF = useLoader(TextureLoader,  `floorF.png`)

     const backC = useLoader(TextureLoader,  `backC.png`)
    const backF = useLoader(TextureLoader,  `backF.png`)

    const { nodes, materials } = useGLTF("dummy.glb");


    const BuddyMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height},
            uMouse: {x:0, y:0},
            pic: brundel,
            pic2: frank,
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({BuddyMaterial})
    const buddyMaterial = useRef()


    const BackMaterial = shaderMaterial(

      {
          uTime: 0,
          uResolution: {x: screen.width, y: screen.height},
          uMouse: {x:0, y:0},
          pic: backC,
          pic2: backF,
      },
      vertexShaderB,
      fragmentShaderB,
  
      
  )
  extend({BackMaterial})
  const backMaterial = useRef()


  const FrontMaterial = shaderMaterial(

    {
        uTime: 0,
        uResolution: {x: screen.width, y: screen.height},
        uMouse: {x:0, y:0},
        pic: floorC,
        pic2: floorF,
    },
    vertexShaderF,
    fragmentShaderF,

    
)
extend({FrontMaterial})
const frontMaterial = useRef()



const ref = useRef()
const ref2 = useRef()






useFrame((  state, delta) => {
   buddyMaterial.current.uTime += delta
   backMaterial.current.uTime += delta
   frontMaterial.current.uTime += delta


  //  ref.current.rotation.z += (delta * .2)
    if (
     buddyMaterial.current.uResolution.x === 0 &&
     buddyMaterial.current.uResolution.y === 0
    ) {
     buddyMaterial.current.uResolution.x = screen.width;
     buddyMaterial.current.uResolution.y = screen.height;
     
    }
})




   

   

// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta *.05))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="FerriteCoreDX-Regular.otf"
       
       position={ [ .0, 9.65, 0 ] }
       fontSize={3}
        
        
        >
          {'Hug me?'.toUpperCase()}
          <meshBasicMaterial color="white" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>
        </Float>

<group  dispose={null} position={[0,-8,0]} scale={2}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dummy_obj.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.039}
      >
      <buddyMaterial ref={buddyMaterial} depthWrite={false} transparent />

        </mesh>
    </group>

    <mesh
      ref={ref}>
      <planeGeometry args={[30, 15,100,100]} />
      <backMaterial ref={backMaterial} side={THREE.DoubleSide} />
    </mesh>

    <mesh
      ref={ref2}
      rotation={[-Math.PI / 2, 0,0]}
      position={[0,-7.5,+7.5]}>
      <planeGeometry args={[30, 15,100,100]} />
      <frontMaterial ref={frontMaterial} side={THREE.DoubleSide} />
    </mesh>

      </>
    )
}
useGLTF.preload("dummy.glb");
