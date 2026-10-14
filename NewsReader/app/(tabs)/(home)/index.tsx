
import { useState } from "react";
import { router } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const categories = [
    ...new Set(ARTICLES.map((article) => article.category)),
  ];

  const filteredArticles = selectedCategory
    ? ARTICLES.filter(
        (article) => article.category === selectedCategory
      )
    : ARTICLES;

  const handlePress = (article: Article) => {
    router.push({
      pathname: "/(tabs)/(home)/[id]",
      params: { id: article.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No articles found.</Text>
        }
        ListHeaderComponent={
          <View>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>
                {filteredArticles.length} stories
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
            >
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  selectedCategory === null && styles.activePill,
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === null && styles.activeText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>

              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterPill,
                      isActive && styles.activePill,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        isActive && styles.activeText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  list: {
    paddingTop: 12,
    paddingBottom: 32,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listHeaderText: {
    fontSize: 12,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  filterContainer: {
    paddingHorizontal: 14,
    paddingBottom: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE5ED",
  },
  activePill: {
    backgroundColor: "#0D9488",
    borderColor: "#0D9488",
  },
  filterText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600",
  },
  activeText: {
    color: "#FFFFFF",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#64748B",
  },
});
