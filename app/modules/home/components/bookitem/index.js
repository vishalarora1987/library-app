import React from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import styles from "./styles"

// This is where we define Book Item as one single entity
// This way an item can be reused in the code in future
const BookItem = ({book}) => {
  // various parameters/keys available in book object, we are only using 3 as of now!
  const {title, author_name, first_publish_year, edition_count, subject, type, cover_edition_key, key} = book;
  return (
      <TouchableHighlight
          style={styles.container}
          underlayColor={"transparent"}>
        <View style={[styles.wrapper]}>
          <View style={[styles.info]}>
            <Text style={[styles.title]}>
              {title}
            </Text>
            <Text style={[styles.author]}>
              {author_name}
            </Text>
            <View style={[styles.bottom]}>
              <Text style={[styles.source]} >
                {first_publish_year}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
  );
}

export default BookItem;