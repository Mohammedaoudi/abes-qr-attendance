import { View, Image, Text } from "react-native";
import {images} from '../constants'


const EmptyState =() => {
return (
    <View className="justify-center items-center px-4">
        <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
        />
        
        <Text className='font-premium text-sm text-blue'>
                  istaghila lforsa fi dirassa wa l3ibada wa nawm
                </Text>
                <Text className='text-xl text-center font-psemibold  mt-2'>
                  Pas de Séances aujourd'hui
                </Text>
    </View>
    
)
}

export default EmptyState