import React, { useEffect, useState } from 'react';
import Bus from '../components/Bus';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Input, message, Row } from 'antd';
import axios from 'axios'


function Home() {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);


  // Dodaj autobus
  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/buses/get-all-buses", 
      tempFilters,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      {/* Pretrazivanje */}
      <div className=' card px-2 py-3' >
        <Row gutter={10} align='center' >
          <Col lg={6} sm={24} >
            <Input className='inpnut-search' type="text"
              placeholder='Od'
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24} >
            <Input type="text"
            className='inpnut-search'
              placeholder='Do'
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24} >
            <Input type="date"
            className='inpnut-search'
              placeholder='Datum'
              value={filters.jorneyDate}
              onChange={(e) => setFilters({ ...filters, jorneyDate: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24} >
            <div className="d-flex gap-3 p-0 ml-10">
              <button className="buttonsearch p-1" onClick={() => getBuses()}>
              <i class="ri-search-2-line"></i>
              </button>
              <button
                className="buttonsearch p-1"
                onClick={() =>
                  setFilters({
                    from: "",
                    to: "",
                    journeyDate: "",
                  })
                }
              >
                <i class="ri-close-line"></i>
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <div>
          <Row gutter={[15, 15]}>

            {buses.filter(bus => bus.status === 'Tek treba da krene').map(bus => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}

          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home