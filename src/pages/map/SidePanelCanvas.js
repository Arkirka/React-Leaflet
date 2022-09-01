import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let style = {
    position: "absolute",
    right: '2%',
    marginTop: '1%',
    zIndex: 100,
    background: '#262626',
    width: '4%',
    minWidth: '55px',
    height: '80%',
    padding: '0px 0px'
};
const SidePanelCanvas = (props) => {
    return <div style={{...style}}>
        <Container fluid>
            <Row>
                <Col>{props.children}</Col>
            </Row>
        </Container>
    </div>
}

export default SidePanelCanvas;