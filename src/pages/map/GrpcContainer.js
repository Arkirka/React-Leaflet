import {FigureServiceClient} from '../../proto/figureProto_grpc_web_pb';
import { SendRequest } from '../../proto/figureProto_pb';
import {FigureCategoryServiceClient} from '../../proto/figureCategoryProto_grpc_web_pb'
import { FigureCategoryRequest } from '../../proto/figureCategoryProto_pb'
import ServerLinks from "../../util/ServerLinks";
import {useEffect} from "react";

const GrpcContainer = (props) => {
    useEffect(() => {
        getProtoFigureCategories();
        getProtoFigures();
    }, []);

    const getProtoFigures = () => {
        let client = new FigureServiceClient(ServerLinks.MAP_MICROSERVICE, null, null);
        let request = new SendRequest();
        //TODO Change mapId argument
        request.setMapid(1);
        let call = client.getFigures(request);
        call.on('data',function(response){
            setFigures(response.getFiguresList());
        });
    }

    const getProtoFigureCategories = () => {
        let client = new FigureCategoryServiceClient(ServerLinks.MAP_MICROSERVICE, null, null);
        let request = new FigureCategoryRequest();
        let call = client.getFigureCategories(request);

        call.on('data',function(response){
            setFigureCategories(response.getFigurecategoriesList());
        });
    }

    const setFigures = (figuresProto) => {
        let figures = [];
        figuresProto.map(element => {
            const obj =
            {
                id : element.array.at(0),
                mapId : element.array.at(1),
                categoryId : element.array.at(2),
                points : element.array.at(3),
                color : element.array.at(4),
                type : element.array.at(5),
                isUnique : element.array.at(6)
            };
            figures.push(obj);
        })
        props.handleFiguresProto(figures);
    }

    const setFigureCategories = (figureCategories) => {
        let categories = [];
        figureCategories.map(element => {
            const obj =
                {
                    icon : element.array.at(0),
                    color : element.array.at(1),
                    type : element.array.at(2),
                    isUnique : element.array.at(3),
                    id : element.array.at(4)
                };
            categories.push(obj);
        })
        props.handleFigureCategoriesProto(categories);
    }

    return null;
}

export default GrpcContainer;