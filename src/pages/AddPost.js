import { Button, Form, Row, Col, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch} from 'react-redux'
import { addPost as addPosts } from '../redux/actions/postAction'


function Addpost() {
  const [image, setImage] = useState("");
  const dispatch = useDispatch()

  function handleFileInput(e) {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  function addPost(values) {
    values.image = image;
    dispatch(addPosts(values));
  }

  return (
    <DefaultLayout>
      <Row justify='center'>
        <Col lg={12}>
          <Form className='bs1 p-3 mt-5' layout='vertical' onFinish={addPost}>
            <h3>Add New Post</h3>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>

            <Form.Item name="image" label="image" rules={[{ required: true }]}>
              <Input type="file" onChange={handleFileInput} />
            </Form.Item>

            {image !== "" && (<img src={image} height="200" width="200" />)}

            <br />
            <div className='text-left' mt-3>
              <Button type='primary' htmlType='submit'>Post</Button>
            </div>

          </Form>
        </Col>
      </Row>
    </DefaultLayout >
  )
}

export default Addpost