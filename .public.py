#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
import sys
import json
import time
import platform
    
rootPath = sys.path[0]
jsonName="downloadList.json"

print('\n\nProcessing '+rootPath+'\n')

print("platform.system()"+platform.system())

def cmp_file(f1, f2):
    #https://zhuanlan.zhihu.com/p/142453128

    if(not os.path.exists(f1) or not os.path.exists(f2) ):
        return False
    st1 = os.stat(f1)
    st2 = os.stat(f2)

    # 比较文件大小
    if st1.st_size != st2.st_size:
        return False

    bufsize = 8*1024
    with open(f1, 'rb') as fp1, open(f2, 'rb') as fp2:
        while True:
            b1 = fp1.read(bufsize)  # 读取指定大小的数据进行比较
            b2 = fp2.read(bufsize)
            if b1 != b2:
                return False
            if not b1:
                return True

            
def createFile(filePath):
    if os.path.exists(filePath):
        return ''
    else:
        try:
            os.mkdir(filePath)
            #print('新建文件夹：%s'%filePath)
        except Exception as e:
            os.makedirs(filePath)
            #print('新建多层文件夹：%s' % filePath)

            
# 遍历文件夹
def copyWithoutHide(file,publicFolderName,ossFolderName):
    for root, dirs, files in os.walk(file, topdown=False):
        for name in files:
            if '\.' in os.path.join(root, name) or '/.' in os.path.join(root, name) :continue
            print('\n')
            a=os.path.join(root, name)

            
            if (platform.system()=='Windows') :
                            
                
                b='\\'.join([file,publicFolderName,root.replace(file,''), name]).replace('\\\\','\\')
                b2='\\'.join([file,publicFolderName,root.replace(file,'')]).replace('//','/')
                
                c='\\'.join([file,ossFolderName,root.replace(file,''), name]).replace('\\\\','\\')
                c2='\\'.join([file,ossFolderName,root.replace(file,'')]).replace('//','/')

                print('writing ' + b )
                createFile(b2)
                createFile(c2)
                if(not cmp_file(a, b)):
                    os.system('xcopy /s /e /y %s %s '%(a , c ))
                os.system('xcopy /s /e /y %s %s '%(a , b ))
            elif(platform.system()=='Darwin'):
                
                
                b='/'.join([file,publicFolderName,root.replace(file,''), name]).replace('//','/')
                b2='/'.join([file,publicFolderName,root.replace(file,'')]).replace('//','/')
                
                c='/'.join([file,ossFolderName,root.replace(file,''), name]).replace('//','/')
                c2='/'.join([file,ossFolderName,root.replace(file,'')]).replace('//','/')

                print('writing ' + b )
                createFile(b2)
                createFile(c2)
                
                if(not cmp_file(a, b)):
                    os.system('cp '+ a +' '+ c)
                os.system('cp '+ a +' '+ b )
            


        #for name in dirs:
            #print(os.path.join(root, name))
    


                    
def main():
    copyWithoutHide(rootPath,'docs','.ossUpload')

if __name__ == '__main__':
    main()

