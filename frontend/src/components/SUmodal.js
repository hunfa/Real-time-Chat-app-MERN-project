import React,{useEffect,useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,Input,useToast
   
  } from '@chakra-ui/react'
  import axios from 'axios';

  import {AttachmentIcon} from "@chakra-ui/icons"
import SUprofile from './SUprofile';

function SUModal({isOpen, onOpen, onClose}) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchUsers, setsearchUsers] = useState([])
    const toast = useToast();

  const handlechange = (e) => {
    const searchtext = e.target.value;
    if (!searchtext) {
      setsearchUsers([])
    }
    else {
      axios.get(`http://localhost:5000/api/searchuser?search=${searchtext}`, { headers: { token: JSON.parse(localStorage.getItem("token")) } })
        .then(res => {
          // console.log(res.data);
          if(res.data.success)
          setsearchUsers(res.data.payload);
          else{
            toast({
              title: "ERROR OCCURED",
              description: res.data.payload,
              status: 'error',
              duration: 5000,
              isClosable: true,
          });
          }
        }).catch(function(error){
          toast({
            title: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        })
    }
  }
  
    
   
    return (
      <>
      
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='scale'
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Search Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input variant='flushed' flexBasis={"85%"} placeholder="Search here" autoComplete="off"  onChange={handlechange} id="search"/>

               <Flex maxH={"240px"} overflowY="auto" flexWrap={"wrap"} mt="6px"  align="center" justifyContent={"center"}>
               {searchUsers.length > 0 ? searchUsers.map((element, index) => {
              return <SUprofile onClose={onClose} key={index} name={element.name} img={element.profileImage} _id={element._id}  />
            }

            ) : ""}
                </Flex> 
                
            </ModalBody>
            <ModalFooter>
            
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default SUModal